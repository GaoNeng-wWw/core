import { writeFileSync } from 'fs';
import { Box, customConfig, optionFactory, spider,gachi, spiderRunParam } from '../dist';
import { urls } from '../src/types/spider';

describe('pipe', ()=>{
	it('save pipe', (done)=>{
		function savePipe(this: any, res: Box){
			const content_xpath = '//*[@id="content"]//text()';
			const title_xpath = '//*[@id="wrapper"]/div[@class="content_read"]/div[@class="box_con"]/div[@class="bookname"]/h1/text()';
			const rawTitle = res?.xpath?.(title_xpath)?.extract?.();
			const rawContent = res?.xpath?.(content_xpath)?.extract?.() as string[] | string;
			let title = '';
			let content = '';
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
			public urls: urls = ['https://www.vipxs.la/52_52648/'];
			public open(config: customConfig): void {}
			public xpath = '//*[@id="list"]/dl/dd[position()>=10]/a/@href';
			public content = '//*[@id="content"]//text()';
			public async run({ engine, res, config }: spiderRunParam): Promise<void> {
				const list = res?.xpath?.(this.xpath)?.extract() as string[];
				for (let i=0;i<list.length;i++){
					if (i === 2){
						done();
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
		const instance = new gachi({
			name: 'Test',
			program: {
				Spider: Spider,
				pipline: [savePipe]
			}
		});
		instance.run().then(()=>{});
	});
});