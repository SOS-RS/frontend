import { useNavigate } from 'react-router-dom';

import { IHeader } from './types';

const Header = (props: IHeader) => {
  const { endAdornment, startAdornment, title } = props;
  const navigate = useNavigate();

  return (
    <div className="bg-red-600 flex h-[56px] justify-between items-center text-white p-3 gap-2 w-full">
      <div className="flex gap-2 ">
        <div className="cursor-pointer" onClick={() => navigate(`/`)}>
          {startAdornment}
        </div>
        <h3 className="font-medium text-white">{title}</h3>
      </div>
      <div className="cursor-pointer ">{endAdornment}</div>
    </div>
  );
};

export { Header };
