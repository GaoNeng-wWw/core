import {existsSync, readFileSync} from 'fs';
import {join, resolve} from 'path';
import { BaseScheduler } from './spider/spider';
import { config, customConfig } from './types/config';
import { Requestmethod, RequestOption } from './types/Request';
import { optionFactory } from './utils/Option';
import {http, https} from './utils/RequestUtil';
import { urls } from './types/spider';
import { pipe } from './types/Pipe';
import { spider } from '..';
import { exit } from 'process';
import { Parser } from './parser/parser';
import {BaseParser} from './types/Parser';
/// <reference lib="./types/Parser">
function readConfigFile(configLocation: string): config{
    if (existsSync(configLocation)){
        return JSON.parse(readFileSync(configLocation).toString());
    } else {
        throw new Error(`Can not find config file. Because ${configLocation} is not exists`);
    }
}
const sleep = (delay: number) => {
    return new Promise((resolve)=>{
        setTimeout(() => {
            return resolve(null);
        }, delay);
    })
}
export interface engine {
    'requestTable': {
        'http:': typeof http,
        'https:': typeof https
    }
    'request': (option: optionFactory, cb?: (this:spider, res: unknown, config: customConfig)=>unknown, errorCallBack?: (this: spider, reason: any)=>void) => Promise<any>;
    'pipelines': pipe[] | []
}
export class gachi{
    private location: string = resolve('.');
    private configLocation: string = `${join(this.location, 'config.ts')}`
    private config:config;
    private spider: BaseScheduler;
    private failUrls: urls = [];
    public  pipelines:pipe[] = [];
    private parser: BaseParser;
    private requestTable: Record<string, (option:RequestOption)=>Promise<Record<string, any>>> = {
        'http:': http,
        'https:': https
    };
    private engineFunction: engine = {
        'requestTable': {
            "http:": http,
            "https:": https
        },
        'request': this.request,
        'pipelines': []
    };
    constructor(config: config){
        this.config = config || readConfigFile(this.configLocation);
        this.spider = new this.config.program.Spider();
        this.pipelines = this.config.program.pipline || [];
        this.engineFunction['request'] = this.request.bind(this);
        this.engineFunction['pipelines'] = this.pipelines;
        // this.parser = new (this.config.program.Parser || Parser)()
        if (this.config.program.Parser){this.parser = new this.config.program.Parser()}
        else{this.parser=new Parser()}
    }
    async run(){
        this.spider.open(this.config.custom || {});
        await this.req(this.spider.urls);
        await this.req(this.failUrls);
        this.spider.shutdown(this.config.custom || {});
    }
    public async request(this: gachi, option: optionFactory, cb?: (this: BaseScheduler, res: unknown, config: customConfig) => unknown, error?: (reason: any) => void){
        let res: unknown;
        try {
            if (this.config.program.middleware?.length){
                this.config.program.middleware?.forEach((mid)=>{
                    mid(option);
                })
            }
            res = this.parser.transformer(await this.requestTable[option.value.protocol](option));
            res = cb?.apply(this.spider, [res, this.config.custom || {}]);
        } catch(e) {
            if (error){
                error(e);
            } else {
                console.error(e);
                exit();
            }
        }
        this.pipelines.forEach((pipe)=>{
            res = pipe(res, this.spider.urls);
        })
    }
    private async req(urls: urls){
        if (typeof urls !== 'string'){
            for (let i=0;i<urls.length;i++){
                const url = urls[i];
                let requestOption = this.toOption(url);
                urls[i] = requestOption;
                if (requestOption.value?.protocol){
                    if (this.config.program.middleware?.length){
                        this.config.program.middleware?.forEach((mid)=>{
                            mid(requestOption);
                        })
                    }
                    const response = this.parser.transformer(await this.requestTable[requestOption.value.protocol](requestOption));
                    if (response.isFail && !response.readyToReply){
                        response.readyToReply = true;
                        this.failUrls.push(requestOption);
                    }
                    let result = await this.spider.run(this.engineFunction, response, this.config.custom || {});
                    if (this.pipelines?.length){
                        this.pipelines?.forEach((pipline)=>{
                            result = pipline.apply(this.spider, [result, this.spider.urls])
                        })
                    }
                } else {
                    this.failUrls.push(requestOption);
                }
                await sleep(this.spider.delay || 1000);
            }
        }
    }
    private toOption(url: urls){
        let requestOption: optionFactory;
        let [Request_url,Request_method,Request_param] = ['', 'GET' as Requestmethod, {}];
        if (url instanceof Array){
            Request_url = url?.[0];
            Request_method = url?.[1];
            Request_param = url?.[2];
            requestOption = new optionFactory(Request_url,Request_method,Request_param);
        } else if (typeof url === 'string'){
            requestOption = new optionFactory(url, 'GET', {});
        } else {
            requestOption = url;
        }
        return requestOption;
    }
}