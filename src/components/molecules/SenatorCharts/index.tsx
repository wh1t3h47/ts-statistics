import React from "react";
import { PartyDistributionBarChart } from "../../organisms/PartyDistributionBarChart";
import { TopContributingBarChart } from "../../organisms/TopContributingBarChart";

const SenatorCharts: React.FC = () => {
  return (
    <>
      <PartyDistributionBarChart />
      <TopContributingBarChart />
    </>
  );
};

export { SenatorCharts };
