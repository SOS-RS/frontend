import { Card } from '../ui/card';
import { IAlert } from './types';

const Alert = (props: IAlert) => {
	const { description, startAdornment } = props;

	return (
		<Card className='p-3 flex gap-3 border-zinc-200 border-[1px] rounded-md select-none w-full items-center text-justify dark:border-zinc-600'>
			<div>{startAdornment}</div>
			<span className='text-sm text-zinc-600 dark:text-zinc-200'>
				{description}
			</span>
		</Card>
	);
};

export { Alert };
