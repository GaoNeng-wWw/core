import { Box, customConfig, engine, gachi, spider, toBox, urls } from "../dist/"
import { Parser as BaseParser} from '../dist/src/parser/parser';

describe('box', ()=>{
    const html = `<h1>HelloWorld</h1>`
    it('default', ()=>{
        const defaultBox = toBox(html, false);
        expect(defaultBox?.xpath?.('//h1/text()')?.extract?.()[0]).toBe('HelloWorld');
    })
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
                extract: ()=>{return ['']},
            };
        }
        class emptySpider extends spider{
            constructor(){super()}
            public urls: urls = [['https://gaoneng-www.github.io/', 'GET', {}]]
            run(this: spider, engine: engine, res: Box, config: customConfig): void {
                expect(res.isExtraBox).toBe(true);
            }
        }
        class newParser implements BaseParser {
            transformer(data: Record<string, any>):Box {
                return selfBox(data);
            }
        }
        let instance = new gachi({
            name: 'hi',
            program:{
                Spider: emptySpider,
                Parser: newParser
            }
        })
        instance.run()
        .then(()=>{})
    })
})