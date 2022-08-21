import { Box } from './Box';
import { Spider, urls } from './spider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type pipe = ((this:Spider, res:Box, urls?: urls)=>any);