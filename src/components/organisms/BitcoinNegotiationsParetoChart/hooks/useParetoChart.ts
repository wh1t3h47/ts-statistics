import { useBitcoinNegotiationsVolume } from "./useBitcoinNegotiationsVolume";
import { scaleBand, scaleLinear } from "@visx/scale";

export const useParetoChart = () => {
    const { topBitcoins } = useBitcoinNegotiationsVolume();

    const adjustedBitcoinData = topBitcoins.map((bitcoin) => ({
        label: bitcoin.symbol,
        value: bitcoin.quote.USD.volume_24h,
    }));

    const barWidth = 30;
    const width = 500;
    const height = 400;
    const margin = { top: 50, right: 0, bottom: 60, left: 130 };

    const xScale = scaleBand<string>({
        domain: adjustedBitcoinData.map((d) => d.label),
        range: [margin.left, width - margin.right],
        padding: 0.1,
    });

    const yScale = scaleLinear<number>({
        domain: [0, Math.max(...adjustedBitcoinData.map((d) => d.value))],
        range: [height - margin.bottom, margin.top],
    });

    return { adjustedBitcoinData, xScale, yScale, width, height, margin, barWidth };
};
