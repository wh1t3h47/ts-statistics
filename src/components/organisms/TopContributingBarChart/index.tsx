import React from "react";
import { useBarChart } from "./hooks/useBarChart";
import { BarChart } from "../../molecules/BarChart";

const TopContributingBarChart: React.FC = () => {
  const {
    topSenators,
    height,

    margin,
    width,
    xScale,
    yScale,
    barWidth,
  } = useBarChart();

  return (
    <div className="lg:min-w-[40rem]">
      <BarChart
        data={topSenators.map((senator) => ({
          label: senator.first_name + " " + senator.last_name,
          value: senator.votes_with_party_pct,
        }))}
        xUnit="Senador"
        yUnit="Porcentagem"
        {...{ xScale, yScale, margin, width, height, barWidth }}
      />
    </div>
  );
};

export { TopContributingBarChart };
