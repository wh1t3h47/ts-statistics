import React from "react";
import { BarChart } from "../../molecules/BarChart";
import { useBarChart } from "./hooks/useBarChart";

const PartyDistributionBarChart: React.FC = () => {
  const { barData, height, margin, width, xScale, yScale, barWidth } =
    useBarChart();

  return (
    <div className="lg:w-11/12 2xl:10/12">
      <BarChart
        data={barData}
        xUnit="Partido"
        yUnit="Porcentagem"
        {...{ xScale, yScale, margin, width, height, barWidth }}
      />
    </div>
  );
};

export { PartyDistributionBarChart };
