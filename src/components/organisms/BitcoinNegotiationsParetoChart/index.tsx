import React from "react";
import { useParetoChart } from "./hooks/useParetoChart";
import { ParetoChart } from "../ParetoChart";

export const BitcoinNegotiationsParetoChart: React.FC = () => {
  const {
    adjustedBitcoinData,
    height,
    margin,
    width,
    xScale,
    yScale,
    barWidth,
  } = useParetoChart();

  return (
    <div className="lg:w-11/12 2xl:10/12">
      <ParetoChart
        data={adjustedBitcoinData}
        xUnit="Criptomoeda"
        yUnit="Volume de negociações"
        {...{ xScale, yScale, margin, width, height, barWidth }}
      />
    </div>
  );
};
