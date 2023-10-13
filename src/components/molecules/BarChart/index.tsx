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
  strokeWidth?: number;
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
  strokeWidth = 1,
}) => {
  const innerHeight = height - margin.top;
  const axisLineClassName = "stroke-2 sm:stroke-[1.5] md:stroke-1";
  const tickClassName = "stroke-[3] sm:stroke-[1.5] md:stroke-1";

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
                y={-margin.bottom}
                width={barWidth}
                height={innerHeight - yScale(d.value)}
                fill="#4caf50"
              />
              <text
                x={
                  (xScale(d.label) || 0) +
                  (xScale.bandwidth() - barWidth) / 2 -
                  margin.left +
                  barWidth / 2
                }
                y={-50}
                textAnchor="middle"
                fill="black"
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
          {...{ axisLineClassName, tickClassName, strokeWidth: "" }}
        />
        <AxisLeft
          scale={yScale}
          left={margin.left}
          label={yUnit}
          labelProps={{ x: -40, dy: "1em", transform: undefined }}
          {...{ axisLineClassName, tickClassName, strokeWidth: "" }}
        />
      </svg>
    </ScaleSVG>
  );
};

export { BarChart };
