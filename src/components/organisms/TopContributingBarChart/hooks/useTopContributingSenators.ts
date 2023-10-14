import { useMemo } from "react";
import { SenatorData } from "../../../../hooks/types/senator";
import { useSenatorsQuery } from "../../../../hooks/useSenatorsQuery";

const TOTAL_SENATORS = 5;

const useTopContributingSenators = () => {
  const { senators } = useSenatorsQuery();

  const getTopSenators = (senatorsData: SenatorData) => {
    const sortedSenators = senatorsData?.results?.[0]?.members || [];

    let totalVotes = 0;
    let numberOfSenators = 0;
    const topSenators = [];

    for (const senator of sortedSenators) {
      totalVotes += senator.votes_with_party_pct;
      numberOfSenators++;

      topSenators.push({
        ...senator,
        percentage: (totalVotes / numberOfSenators) * 100,
      });

      if (totalVotes >= 80 && numberOfSenators >= TOTAL_SENATORS) {
        break;
      }
    }

    return topSenators;
  };

  const topSenators = useMemo(() => getTopSenators(senators), [senators]);

  return { senators, topSenators };
};

export { useTopContributingSenators };
