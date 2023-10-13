import React from "react";
import { BarChart } from "../../molecules/BarChart";
import { useBarChart } from "./hooks/useBarChart";

const PartyDistributionBarChart: React.FC = () => {
  const { barData, height, loading, margin, width, xScale, yScale, barWidth } =
    useBarChart();

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2 className="text-center text-2xl font-bold">
            Distribuição de partidos ocupando <br />
            posições no senado (EUA):
          </h2>
          <BarChart
            data={barData}
            xUnit="Partido"
            yUnit="Porcentagem"
            {...{ xScale, yScale, margin, width, height, barWidth }}
          />
        </div>
      )}
    </>
  );
};

export { PartyDistributionBarChart };
