import { customConfig } from '../types/config';
import {Response} from '../types/Response';
import { urls } from '../types/spider';
import { engine } from '../gachi';
export class BaseScheduler{
    constructor(){}
    public lock: boolean = false;
    public urls: urls = [];
    public delay?: number;
    public open(config: customConfig,...args:[]){}
    public run(this: BaseScheduler, engine: engine,res: Response, config: customConfig){}
    public shutdown(config: customConfig,...args:[]){}
}