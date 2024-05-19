import { Card } from '../ui/card';
import { IAlert } from './types';

const Alert = (props: IAlert) => {
  const { description, startAdornment } = props;

  return (
    <Card className="flex w-full select-none items-center gap-3 rounded-md border border-zinc-200 p-3 text-justify">
      <div>{startAdornment}</div>
      <span className="text-sm text-zinc-600">{description}</span>
    </Card>
  );
};

export { Alert };
