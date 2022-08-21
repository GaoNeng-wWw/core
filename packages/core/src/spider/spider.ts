/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { customConfig } from '../types/config';
import { spiderRunParam, urls } from '../types/spider';
export class Spider{
	public lock = false;
	public urls: urls = [];
	public delay?: number;
	public open(config: customConfig,...args: any[]){}
	public run({ engine, res, config }: spiderRunParam){}
	public shutdown(config: customConfig,...args: any[]){}
}