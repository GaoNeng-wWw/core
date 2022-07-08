import { Box } from "./Box";
import { Spider, urls } from "./spider";

export declare type pipe = ((this:Spider, res:Box, urls?: urls)=>any);