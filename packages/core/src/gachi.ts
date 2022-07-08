import {existsSync, readFileSync} from 'fs';
import {join, resolve} from 'path';
import { config, customConfig } from './types/config';
import { Requestmethod, RequestOption } from './types/Request';
import { optionFactory } from './utils/Option';
import {http, https} from './utils/RequestUtil';
import { Spider, urls } from './types/spider';
import { pipe } from './types/Pipe';
import { Box } from '..';
import { exit } from 'process';
import { Parse } from './parser/parser';
import {BaseParser} from './types/Parser';
import {engine} from './types/gachi';
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
export class gachi{
    private location: string = resolve('.');
    private configLocation: string = `${join(this.location, 'config.ts')}`
    private config:config;
    private spider: Spider;
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
        else{this.parser=new Parse()}
    }
    async run(){
        this.spider.open(this.config.custom || {});
        await this.req(this.spider.urls);
        await this.req(this.failUrls);
        this.spider.shutdown(this.config.custom || {});
    }
    public async request(this: gachi, option: optionFactory, cb?: (this: Spider, res: unknown, config: customConfig) => unknown, error?: (reason: any) => void){
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
            res = pipe.bind(this.spider)(res as Box, (this.spider.urls || []));
        })
    }
    private async req(urls: urls){
        if (typeof urls !== 'string'){
            for (let i=0;i<urls.length;i++){
                const url:string[] | urls = urls[i] as string[] | urls;
                let requestOption = this.toOption(url as string[] | urls);
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
                        (this.failUrls as optionFactory[]).push(requestOption);
                    }
                    let result = await this.spider.run(this.engineFunction, response, this.config.custom || {}) as unknown as Box;
                    if (this.pipelines?.length){
                        this.pipelines?.forEach((pipline)=>{
                            result = pipline.apply(this.spider, [result, this.spider.urls])
                        })
                    }
                } else {
                    (this.failUrls as optionFactory[]).push(requestOption);
                }
                await sleep(this.spider.delay || 1000);
            }
        }
    }
    private toOption(url: urls){
        let requestOption: optionFactory;
        let [Request_url,Request_method,Request_param] = ['', 'GET' as Requestmethod, {}];
        if (url instanceof Array){
            Request_url = (url as string[])?.[0];
            Request_method = (url as string[])?.[1] as Requestmethod;
            Request_param = (url as string[])?.[2];
            requestOption = new optionFactory(Request_url,Request_method,Request_param);
        } else if (typeof url === 'string'){
            requestOption = new optionFactory(url, 'GET', {});
        } else {
            requestOption = url;
        }
        return requestOption;
    }
}
