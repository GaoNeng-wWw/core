import { Spider } from "./spider";
import { pipe } from "./Pipe";
import { optionFactory } from "./Option";
import { BaseParser } from "./Parser";
export declare interface config{
    name: string;
    program: {
        Spider: typeof Spider;
        Parser?: typeof BaseParser;
        middleware?: ((option: optionFactory) => void)[];
        pipline?: pipe[];
    };
    custom?:customConfig
}

export declare interface customConfig {
    [x:string]: any;
}