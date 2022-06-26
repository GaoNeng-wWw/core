import { writeFileSync } from "fs";
import { exit } from "process";
import { optionFactory, spider } from "..";
import { userInfo } from "../api/user";
import { videoList } from "../api/video";
import { engine, gachi } from "../src/gachi";
import { Box } from "../src/types/Box";
import { customConfig } from "../src/types/config";
import { urls } from "../src/types/spider";

describe('pipe', ()=>{
    it('', async ()=>{
        function savePipe(this: any, res: Box){
            const content_xpath = `//*[@id="content"]//text()`;
            const title_xpath = `//*[@id="wrapper"]/div[@class="content_read"]/div[@class="box_con"]/div[@class="bookname"]/h1/text()`;
            let title = res?.xpath?.(title_xpath)?.extract()
            let content = res?.xpath?.(content_xpath)?.extract() as string[] | string;
            if (title){
                title = title[0].replace('正文 ', '');
                console.log(title);
            }
            if (content){
                content = (content as string[]).join('').replace(/&nbsp;/gim,' ');
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
            public async run(engine: engine, res: Box, config: customConfig) {
                const list = res?.xpath?.(this.xpath).extract();
                for (let i=0;i<list.length;i++){
                    const l = list[i];
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
        await instance.run()
    })
})