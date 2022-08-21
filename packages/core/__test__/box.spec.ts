import { Box, gachi, spider, spiderRunParam, toBox, urls, BaseParser } from '../dist/';

describe('box', ()=>{
	const html = '<h1>HelloWorld</h1>';
	it('default', ()=>{
		const defaultBox = toBox(html, false);
		expect(defaultBox?.xpath?.('//h1/text()')?.extract?.()[0]).toBe('HelloWorld');
	});
	it('extract', ()=>{
		const selfBox = (data: Record<string,any>):Box => {
			return {
				readyToReply: false,
				isFail: false,
				isExtraBox: true,
				_raw: data,
				_doc: null,
				_hasDoc: false,
				_selectedValue: undefined,
				extract: ()=>{return [''];},
			};
		};
		class emptySpider extends spider{
			public urls: urls = [['https://gaoneng-www.github.io/', 'GET', {}]];
			run({res}: spiderRunParam): void {
				expect(res.isExtraBox).toBe(true);
			}
		}
		class newParser implements BaseParser {
			transformer(data: Record<string, any>):Box {
				return selfBox(data);
			}
		}
		const instance = new gachi({
			name: 'hi',
			program:{
				Spider: emptySpider,
				Parser: newParser
			}
		});
		instance.run()
			.then(()=>{});
	});
});