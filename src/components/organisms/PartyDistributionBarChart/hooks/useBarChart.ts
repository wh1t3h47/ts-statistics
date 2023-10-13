import { usePartyDistribution } from "./usePartyDistribution";
import { scaleBand, scaleLinear } from "@visx/scale";

export const useBarChart = () => {
    const { loading, barData } = usePartyDistribution();

    const barWidth = 30;
    const width = 500;
    const height = 400;
    const margin = { top: 50, right: 30, bottom: 40, left: 40 };

    const xScale = scaleBand<string>({
        domain: barData.map((d) => d.label),
        range: [margin.left, width - margin.right],
        padding: 0.1,
    });

    const yScale = scaleLinear<number>({
        domain: [0, Math.max(...barData.map((d) => d.value))],
        range: [height - margin.bottom, margin.top],
    });

    return { loading, barData, xScale, yScale, width, height, margin, barWidth };
}
