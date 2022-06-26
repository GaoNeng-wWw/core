export declare type urls = string[][] | Option[] | string[];

export declare class spider {
    public lock: boolean = false;
    public urls: urls = [];
    public delay?: number;
    public open(config: customConfig,...args:[]){}
    public run(this: BaseSpider, engine: engine,res: Response, config: customConfig){}
    public shutdown(config: customConfig,...args:[]){}
}