import { Card } from "../ui/card";
import { IAlert } from "./types";

const Alert = (props: IAlert) => {
  const { description, startAdornment } = props;
  return (
    <Card className="p-2 flex gap-2 text-slate-500  border-slate-500 rounded-md">
      <div>{startAdornment}</div>
      <span className="text-sm">{description}</span>
    </Card>
  );
};

export { Alert };
