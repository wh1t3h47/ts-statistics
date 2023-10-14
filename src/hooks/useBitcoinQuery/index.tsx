import { useEffect, useState } from "react";
import { BitcoinData } from "../types/bitcoin";

export function useBitcoinQuery() {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData>({} as never);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // @fixme: Precisamos de um back ou pedir pra habilitar * no CORS
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _fetchData = async () => {
      try {
        const response = await fetch(
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
          {
            method: "GET",
            headers: {
              "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY,
            } as HeadersInit,
          }
        );

        const data = await response.json();
        setBitcoinData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Bitcoin data:", error);
        setLoading(false);
      }
    };
    const prefetchData = async () => {
      import("./mock.json").then(({ default: data }) => {
        setBitcoinData(data);
        setLoading(false);
      });
    };

    prefetchData();
  }, []);

  return { bitcoinData, loading };
}
