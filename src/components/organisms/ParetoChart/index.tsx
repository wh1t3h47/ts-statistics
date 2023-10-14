import React, { useMemo } from "react";
import { ScaleSVG } from "@visx/responsive";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { Line, Circle } from "@visx/shape";
import { Text } from "@visx/text";
import { scaleBand, scaleLinear } from "@visx/scale";
import { max } from "d3-array";
import { LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";

interface DataItem {
  label: string;
  value: number;
}

interface ParetoChartProps {
  data: DataItem[];
  width: number;
  height: number;
  xUnit: string;
  yUnit: string;
  margin: { top: number; right: number; bottom: number; left: number };
}

const ParetoChart: React.FC<ParetoChartProps> = ({
  data,
  width,
  height,
  xUnit,
  yUnit,
  margin,
}) => {
  const cumulativeData = useMemo(() => {
    const total = data.reduce((sum, { value }) => sum + value, 0);
    let cumulativeSum = 0;
    return data.map(({ label, value }) => {
      cumulativeSum += value;
      return {
        label,
        value,
        percentage: cumulativeSum / total,
      };
    });
  }, [data]);

  const paretoIndex = useMemo(() => {
    const index = cumulativeData.findIndex(
      ({ percentage }) => percentage >= 0.8
    );
    return index >= 0 ? index : cumulativeData.length - 1;
  }, [cumulativeData]);

  const xScale = scaleBand({
    domain: data.map(({ label }) => label),
    range: [margin.left, width - margin.right],
    padding: 0.2,
  });

  const yScale = scaleLinear({
    domain: [0, max(data, ({ value }) => value) || 0],
    range: [height - margin.bottom, margin.top],
    nice: true,
  });

  const yPercentageScale = scaleLinear({
    domain: [0, 1],
    range: [height - margin.bottom, margin.top],
    nice: true,
  });

  const curveData = cumulativeData
    .slice(0, paretoIndex + 1)
    .map((d) => ({ label: d.label, percentage: d.percentage }));

  return (
    <ScaleSVG width={width} height={height}>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <Group>
          {data.map(({ label, value }, index) => (
            <rect
              key={label}
              x={xScale(label)}
              y={yScale(value)}
              width={xScale.bandwidth()}
              height={yScale(0) - yScale(value)}
              fill={index <= paretoIndex ? "#10B981" : "#3B82F6"}
            />
          ))}
        </Group>
        <Group>
          {paretoIndex >= 0 && (
            <Group>
              <Line
                x1={xScale(data[paretoIndex].label) || 0}
                y1={yScale(data[paretoIndex].value)}
                x2={xScale(data[paretoIndex].label) || 0}
                y2={yPercentageScale(cumulativeData[paretoIndex].percentage)}
                stroke="black"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              {cumulativeData.slice(0, paretoIndex + 1).map((d, index) => (
                <Circle
                  key={index}
                  cx={xScale(d.label) || 0}
                  cy={yPercentageScale(d.percentage)}
                  r={5}
                  fill="black"
                />
              ))}
            </Group>
          )}
        </Group>
        <AxisBottom
          scale={xScale}
          top={height - margin.bottom}
          label={xUnit}
          labelProps={{ fontSize: 16, dy: 8 }}
          tickLabelProps={{ fontSize: 17 }}
        />
        <AxisLeft
          scale={yScale}
          left={margin.left}
          label={yUnit}
          labelProps={{ x: -80, dy: 60, transform: "", fontSize: 22 }}
          tickLabelProps={{ fontSize: 17 }}
        />
        {paretoIndex >= 0 && (
          <LinePath
            data={curveData}
            x={(d) => xScale(d.label) || 0 + xScale.bandwidth() / 2}
            y={(d) => yPercentageScale(d.percentage)}
            stroke="red"
            strokeWidth={2}
            curve={curveMonotoneX}
          />
        )}
      </svg>
    </ScaleSVG>
  );
};

export { ParetoChart };
