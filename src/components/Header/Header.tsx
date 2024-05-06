import { IHeader } from "./types";

const Header = (props: IHeader) => {
  const { endAdornment, startAdornment, title } = props;

  return (
    <div className=" bg-red-600 flex h-[56px] justify-between items-center text-white p-3 gap-2 ">
      <div className="flex gap-2">
        {startAdornment}
        <h3 className="font-medium "> {title}</h3>
      </div>
      <div className="cursor-pointer ">{endAdornment}</div>
    </div>
  );
};

export { Header };
