import { customConfig } from "./config";
import { optionFactory } from "./Option";
import { engine } from "./gachi";
import { Box } from "./Box";
import { Requestmethod } from "./Request";

export type urls = Array<[string, Requestmethod, Record<string,any>] | optionFactory | string> | string;

export declare class Spider {
    public lock: boolean;
    public urls: urls;
    public delay?: number;
    public open(config: customConfig,...args:[]): any
    public run(this: Spider, engine: engine,res: Box, config: customConfig): Box | void | Promise<void>
    public shutdown(config: customConfig,...args:[]): any
}
