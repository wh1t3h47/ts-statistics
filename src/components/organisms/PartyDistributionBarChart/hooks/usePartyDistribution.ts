import { useMemo } from "react";
import { SenatorData } from "../../../../hooks/types/senator";
import { useSenatorsQuery } from "../../../../hooks/useSenatorsQuery";

const usePartyDistribution = () => {
    const { senators, loading } = useSenatorsQuery();

    const getPartyCounts = (senatorsData: SenatorData) => {
        const partyCounts: Record<string, number> = {};

        const members = senatorsData?.results?.[0]?.members || [];
        members.forEach((senator) => {
            const party = senator.party;
            partyCounts[party] = (partyCounts[party] || 0) + 1;
        });

        return partyCounts;
    };

    const generateBarData = (counts: Record<string, number>) => {
        const totalParties = Object.values(counts).reduce((total, count) => total + count, 0);

        const sortedPartyData = Object.entries(counts)
            .map(([party, count]) => ({
                label: party,
                value: Math.round((count / totalParties) * 100),
            }))
            .sort((a, b) => b.value - a.value);

        return sortedPartyData;
    };

    const barData = useMemo(() =>
        generateBarData(getPartyCounts(senators)),
        [senators]
    );

    return { senators, loading, barData };
};



export { usePartyDistribution };
