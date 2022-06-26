export type engine  = {
    'requestTable': {
        'http:': typeof http,
        'https:': typeof https
    }
    'request': (option: optionFactory, cb?: (this:spider, res: unknown, config: customConfig)=>unknown, errorCallBack?: (this: spider, reason: any)=>void) => Promise<any>;
    'pipelines': pipe[] | []
}