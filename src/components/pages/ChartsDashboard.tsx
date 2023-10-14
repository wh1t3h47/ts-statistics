import React, { useState, useEffect } from "react";
import { Card } from "../molecules/Card";
import { useSenatorsQuery } from "../../hooks/useSenatorsQuery";
import { useBitcoinQuery } from "../../hooks/useBitcoinQuery";
import { BitcoinNegotiationsParetoChart } from "../organisms/BitcoinNegotiationsParetoChart";

const ChartsDashboard = () => {
  const { loading } = useSenatorsQuery();
  const { loading: btcLoading } = useBitcoinQuery();
  const [importLoading, setImportLoading] = useState(true);
  const [partyDistributionChart, setPartyDistributionChart] =
    useState<JSX.Element | null>(null);
  const [topContributingChart, setTopContributingChart] =
    useState<JSX.Element | null>(null);

  useEffect(() => {
    import("../organisms/PartyDistributionBarChart")
      .then((module) => {
        setPartyDistributionChart(<module.PartyDistributionBarChart />);
      })
      .then(() => {
        import("../organisms/TopContributingBarChart").then((module) => {
          setTopContributingChart(<module.TopContributingBarChart />);
          setImportLoading(false);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const isLoading = importLoading || loading || btcLoading;

  return (
    <div className="flex flex-wrap justify-center">
      <Card
        title="Distribuição de partidos ocupando
            posições no senado (EUA):"
        {...{ isLoading }}
      >
        {partyDistributionChart}
      </Card>
      <Card title="Top 5 contribuidores no senado (EUA):" {...{ isLoading }}>
        {topContributingChart}
      </Card>
      <Card
        title="Distribuição de volume de negociações por criptomoeda:"
        {...{ isLoading }}
      >
        <BitcoinNegotiationsParetoChart />
      </Card>
    </div>
  );
};

export { ChartsDashboard };
