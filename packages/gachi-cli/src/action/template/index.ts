import {spider,urls,engine,Box,customConfig} from 'gachi';
export class Spider extends spider{
    constructor(){super()}
    public urls: urls = [];
    public async run(this: spider,engine: engine, res: Box, config: customConfig) {
    }
}