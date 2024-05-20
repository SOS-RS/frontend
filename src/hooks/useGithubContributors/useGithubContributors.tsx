import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

import { IGithubContributor } from './types';

function useGithubContributors(owner: string, repo: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IGithubContributor[]>([]);

  const refresh = useCallback(
    (config?: AxiosRequestConfig<any>) => {
      setLoading(true);
      axios
        .get(
          `https://api.github.com/repos/${owner}/${repo}/contributors`,
          config
        )
        .then(({ data }) => setData(data))
        .finally(() => setLoading(false));
    },
    [owner, repo]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, refresh };
}

export { useGithubContributors };
