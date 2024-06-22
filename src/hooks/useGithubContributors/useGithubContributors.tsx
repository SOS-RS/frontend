import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

import { IGithubContributor } from './types';

function useGithubContributors(owner: string, repo: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IGithubContributor[]>([]);

  const refresh = useCallback(
    async (config?: AxiosRequestConfig<any>, page=1, allData=[]) => {
      setLoading(true);
      const response = await axios
        .get(
          `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100&page=${page}`,
          config
        );
        const newData = allData.concat(response.data);
        const linkHeader = response.headers.link;
        if (linkHeader && linkHeader.includes('rel="next"')) {
          const nextPage = page + 1;
          return refresh(config, nextPage, newData);
        } else {
          setData(newData);
          setLoading(false);
        }
    },
    [owner, repo]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, refresh };
}

export { useGithubContributors };
