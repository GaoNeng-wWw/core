import { writeFileSync } from "fs";
import { exit } from "process";
import { Box, customConfig, engine, optionFactory, spider,gachi } from "../dist";
import { userInfo } from "../api/user";
import { videoList } from "../api/video";
import { urls } from "../src/types/spider";

describe('pipe', ()=>{
    it('save pipe', (done)=>{
        function savePipe(this: any, res: Box){
            const content_xpath = `//*[@id="content"]//text()`;
            const title_xpath = `//*[@id="wrapper"]/div[@class="content_read"]/div[@class="box_con"]/div[@class="bookname"]/h1/text()`;
            let rawTitle = res?.xpath?.(title_xpath)?.extract?.()
            let rawContent = res?.xpath?.(content_xpath)?.extract?.() as string[] | string;
            let title = '';
            let content = ''
            if (rawTitle){
                title = rawTitle[0].replace('正文 ', '');
            }
            if (rawContent){
                content = (rawContent as string[]).join('').replace(/&nbsp;/gim,' ');
                writeFileSync(`./data/${title}.txt`, content);
            }
            return res;
        }
        class Spider extends spider{
            constructor(){
                super();
            }
            public baseUrl = 'https://www.vipxs.la';
            public urls: urls = ['https://www.vipxs.la/52_52648/']
            public open(config: customConfig): void {}
            public xpath = `//*[@id="list"]/dl/dd[position()>=10]/a/@href`;
            public content = `//*[@id="content"]//text()`
            public async run(this: Spider, engine: engine, res: Box, config: customConfig): Promise<void> {
                const list = res?.xpath?.(this.xpath)?.extract() as string[];
                for (let i=0;i<list.length;i++){
                    if (i === 2){
                        done(true);
                        return;
                    }
                    const l = list?.[i];
                    const option = new optionFactory(`${this.baseUrl}${l}`, 'GET', {});
                    (await engine.request(option, (res: unknown, config: customConfig)=>{
                        return res;
                    }));
                }
            }
        }
        let instance = new gachi({
            name: 'Test',
            program: {
                Spider: Spider,
                pipline: [savePipe]
            }
        })
        instance.run().then(()=>{})
    })
})