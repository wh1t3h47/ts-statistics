import { useEffect, useState } from 'react';
import { SenatorData } from '../types/senator';

export function useSenatorsQuery() {
    const [senators, setSenators] = useState<SenatorData>({} as never);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        // @fixme: Precisamos de um back ou pedir pra habilitar * no CORS
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _fetchData = async () => {
            try {
                const response = await fetch('https://api.propublica.org/congress/v1/members/senate.json', {
                    headers: ({
                        'X-API-Key': process.env.REACT_APP_API_KEY,
                    }) as never,
                });

                const data = await response.json() as SenatorData;
                setSenators(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        const prefetchData = async () => {
            import('./mock.json').then(({ default: data }) => {
                setSenators(data);
                setLoading(false);
            });
        };

        prefetchData();
        // @todo Nossa API de políticos tem bug e não permite CORS
        //fetchData();
    }, []);

    return { senators, loading };
}
