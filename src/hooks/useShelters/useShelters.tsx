import { useFetch } from '../useFetch';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';
import { IUseShelterData } from './types';

<<<<<<< HEAD
const useShelter = (shelterId: string) => {
  return useFetch<IUseShelterData>(
    `${PaginatedQueryPath.Shelters}/${shelterId}`
=======
import { api } from '@/api';
import { IServerResponse } from '@/types';
import { IPaginatedResponse } from '../usePaginatedQuery/types';
import { IUseShelterOptions, IUseSheltersData } from './types';

const useShelters = (options: IUseShelterOptions = {}) => {
  const { cache } = options;
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IPaginatedResponse<IUseSheltersData>>({
    count: 0,
    page: 1,
    perPage: 20,
    results: [],
  });

  const refresh = useCallback(
    (config: AxiosRequestConfig<any> = {}, append: boolean = false) => {
      const { search, ...rest } = (config ?? {}).params ?? {};
      const headers = config.headers ?? {};
      if (cache) headers['x-app-cache'] = 'true';
      if (!append) setLoading(true);
      api
        .get<IServerResponse<any>>('/shelters', {
          ...config,
          headers,
          params: {
            orderBy: 'updatedAt',
            order: 'desc',
            search:
              search ?? new URLSearchParams(window.location.search).toString(),
            ...rest,
          },
        })
        .then(({ data }) => {
          if (append) {
            setData((prev) => ({
              ...prev,
              ...data.data,
              results: [...prev.results, ...data.data.results],
            }));
          } else {
            setData((prev) => ({
              ...prev,
              ...data.data,
              results: [...data.data.results],
            }));
          }
        })
        .finally(() => {
          if (!append) setLoading(false);
        });
    },
    [cache]
>>>>>>> 2b13673 (Update staging branch (#299))
  );
};

export { useShelter };