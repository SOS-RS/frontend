import { ApiSearchFunc } from './ApiSearch';
import { ApiSearchProps } from './types';

const ApiSearch = ApiSearchFunc as <T>(
  props: ApiSearchProps<T> & { ref?: any }
) => JSX.Element;

export { ApiSearch };
