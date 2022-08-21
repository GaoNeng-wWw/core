/* eslint-disable @typescript-eslint/no-explicit-any */
import { customConfig } from './config';
import { optionFactory } from './Option';
import { engine } from './gachi';
import { Box } from './Box';
import { Requestmethod } from './Request';

export type urls = Array<[string, Requestmethod, Record<string,any>] | optionFactory | string> | string;
export type spiderRunParam = {engine: engine, res: Box, config: customConfig};
export declare class Spider {    
	public urls: urls;
	public delay?: number;
	public open(config: customConfig,...args:[]): any
	public run({engine, res, config}: spiderRunParam): Box | void | Promise<void>
	public shutdown(config: customConfig,...args:[]): any
}
