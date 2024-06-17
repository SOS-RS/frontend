import { Loader2 } from 'lucide-react';
import { ILoader } from './types';

const Loader = (props: ILoader) => {
  const { loading, children } = props;

  if (loading) return <Loader2 className="h-5 w-5 animate-spin" />;

  return children;
};

export { Loader };
