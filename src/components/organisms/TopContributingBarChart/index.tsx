import React from "react";
import { useBarChart } from "./hooks/useBarChart";
import { BarChart } from "../../molecules/BarChart";

const TopContributingBarChart: React.FC = () => {
  const {
    topSenators,
    height,
    loading,
    margin,
    width,
    xScale,
    yScale,
    barWidth,
  } = useBarChart();

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2 className="text-center text-2xl font-bold">
            Top 5 contribuidores no senado (EUA):
          </h2>
          <BarChart
            data={topSenators.map((senator) => ({
              label: senator.first_name + " " + senator.last_name,
              value: senator.votes_with_party_pct,
            }))}
            xUnit="Senador"
            yUnit="Porcentagem"
            strokeWidth={4}
            {...{ xScale, yScale, margin, width, height, barWidth }}
          />
        </div>
      )}
    </>
  );
};

export { TopContributingBarChart };
