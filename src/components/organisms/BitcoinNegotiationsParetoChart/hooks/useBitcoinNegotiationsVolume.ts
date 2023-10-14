import { useMemo } from "react";
import { BitcoinData } from "../../../../hooks/types/bitcoin";
import { useBitcoinQuery } from "../../../../hooks/useBitcoinQuery";

const TOTAL_COINS = 5;

const useBitcoinNegotiationsVolume = () => {
  const { bitcoinData } = useBitcoinQuery();

  const getTopBitcoins = (bitcoinData: BitcoinData) => {
    const sortedBitcoins = bitcoinData?.data?.sort((a, b) => b.quote.USD.volume_24h - a.quote.USD.volume_24h) || [];

    let totalVolume = 0;
    let numberOfCoins = 0;
    const topBitcoins = [];

    for (const coin of sortedBitcoins) {
      totalVolume += coin.quote.USD.volume_24h;
      numberOfCoins++;

      topBitcoins.push({
        ...coin,
        percentage: (totalVolume / numberOfCoins) * 100,
      });

      if (totalVolume >= 1000000 && numberOfCoins >= TOTAL_COINS) {
        break;
      }
    }

    return topBitcoins;
  };

  const topBitcoins = useMemo(() => getTopBitcoins(bitcoinData), [bitcoinData]);

  return { bitcoinData, topBitcoins };
};

export { useBitcoinNegotiationsVolume };
