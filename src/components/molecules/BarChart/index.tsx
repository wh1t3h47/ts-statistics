import React from "react";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { ScaleInput, AnyD3Scale } from "@visx/scale";
import { ScaleSVG } from "@visx/responsive";

interface DataItem {
  label: string;
  value: number;
}

interface BarChartProps {
  data: DataItem[];
  width: number;
  height: number;
  xScale: ScaleInput<AnyD3Scale>;
  yScale: ScaleInput<AnyD3Scale>;
  barWidth: number;
  xUnit: string;
  yUnit: string;
  margin: { top: number; right: number; bottom: number; left: number };
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  width,
  height,
  xScale,
  yScale,
  barWidth,
  xUnit,
  yUnit,
  margin,
}) => {
  const innerHeight = height - margin.bottom;
  const axisLineClassName = "stroke-[3] sm:stroke-2 md:stroke-2";
  const tickClassName = "stroke-[3] sm:stroke-2 md:stroke-2";

  return (
    <ScaleSVG width={width} height={height}>
      <svg width={width} height={height}>
        <Group transform={`translate(${margin.left}, ${margin.top})`}>
          {data.map((d, index) => (
            <Group key={index} top={yScale(d.value)}>
              <Bar
                x={
                  (xScale(d.label) || 0) +
                  (xScale.bandwidth() - barWidth) / 2 -
                  margin.left
                }
                y={-margin.top}
                width={barWidth}
                height={innerHeight - yScale(d.value)}
                fill="#4caf50"
              />
              <text
                x={
                  (xScale(d.label) || 0) +
                  (xScale.bandwidth() - barWidth) / 2 -
                  margin.left +
                  barWidth +
                  25
                }
                y={20 - margin.bottom}
                textAnchor="middle"
                className="fill-green-500"
                fontSize={18}
              >
                {d.value}
              </text>
            </Group>
          ))}
        </Group>
        <AxisBottom
          scale={xScale}
          top={height - margin.bottom}
          label={xUnit}
          {...{
            axisLineClassName,
            tickClassName,
            strokeWidth: "",
          }}
          labelProps={{ fontSize: 16, dy: 8 }}
          tickLabelProps={{ fontSize: 17 }}
        />
        <AxisLeft
          scale={yScale}
          left={margin.left}
          label={yUnit}
          labelProps={{ x: -80, dy: 60, transform: "", fontSize: 22 }}
          {...{ axisLineClassName, tickClassName, strokeWidth: "" }}
          tickLabelProps={{ fontSize: 17 }}
        />
      </svg>
    </ScaleSVG>
  );
};

export { BarChart };
