import { BaseSpider } from "./spider";
import { middleware } from "./Middleware";
import { Response } from './Response';
import { pipe } from "./Pipe";
export declare interface config{
    name: string;
    program: {
        Spider: typeof BaseSpider;
        Parser?: typeof BaseParser;
        middleware?: ((option: optionFactory) => void)[];
        pipline?: pipe[];
    };
    custom?:customConfig
}

export declare interface customConfig {
    [x:string]: any;
}