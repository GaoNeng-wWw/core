import { customConfig } from '../types/config';
import {Response} from '../types/Response';
import { spiderRunParam, urls } from '../types/spider';
import { engine } from '../types/gachi';
export class Spider{
    constructor(){}
    public lock: boolean = false;
    public urls: urls = [];
    public delay?: number;
    public open(config: customConfig,...args:[]){}
    public run({ engine, res, config }: spiderRunParam){}
    public shutdown(config: customConfig,...args:[]){}
}