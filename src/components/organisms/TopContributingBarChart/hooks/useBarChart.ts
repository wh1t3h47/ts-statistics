import { useTopContributingSenators } from "./useTopContributingSenators";
import { scaleBand, scaleLinear } from "@visx/scale";

export const useBarChart = () => {
  const { topSenators } = useTopContributingSenators();

  const barWidth = 15;
  const width = 800;
  const height = 400;
  const margin = { top: 50, right: 15, bottom: 60, left: 80 };

  const xScale = scaleBand<string>({
    domain: topSenators.map(
      (senator) => senator.first_name + " " + senator.last_name
    ),
    range: [margin.left, width - margin.right],
    padding: 0.1,
  });

  const yScale = scaleLinear<number>({
    domain: [
      0,
      Math.max(...topSenators.map((senator) => senator.votes_with_party_pct)),
    ],
    range: [height - margin.bottom, margin.top],
  });

  return {

    topSenators,
    xScale,
    yScale,
    width,
    height,
    margin,
    barWidth,
  };
};
