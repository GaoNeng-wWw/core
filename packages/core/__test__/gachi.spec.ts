import {spider,gachi, Box, customConfig, urls, RequestOption} from '..';
import { engine } from '../src/gachi';

function notHasReturnValueTestFunction(){
    return true;
}
describe('gachi', ()=>{
    it('init', ()=>{
        class Spider extends spider{
            constructor(){
                super();
            }
            public open(): void {
                expect(notHasReturnValueTestFunction()).toBe(true)
            }
            public shutdown(): void {
                expect(notHasReturnValueTestFunction()).toBe(true)
            }
        }
        new gachi({
            name: 'Test',
            custom: {},
            program: {
                Spider: Spider
            }
        }).run();
    })
    it('spider', async ()=>{
        class Spider extends spider{
            constructor(){
                super();
            }
            public urls: urls = [['https://gaoneng-www.github.io/', 'GET', {}]]
            public async run(this: spider,engine: engine, res: Box, config: customConfig) {
                let img = res?.xpath?.('/html/body/div/div[4]/div[1]/img/@src');
                expect(img?.extract()[0]).toBe('/img/author_avatar.jpg');
            }
        }
        let instance = new gachi({
            name: 'Test',
            custom: {},
            program: {
                Spider: Spider
            }
        })
        await instance.run()
    })
    it('middleware', async ()=>{
        function mid(opt: RequestOption){
            Reflect.set(opt, 'isChange', true);
        }
        class Spider extends spider{
            constructor(){
                super();
            }
            public urls: urls = [['https://gaoneng-www.github.io/', 'GET', '{}']]
            public async run(this: spider, engine: engine, res: Box, config: customConfig) {
                expect(this.urls[0]['isChange']).toBe(true);
                let img = res?.xpath?.('/html/body/div/div[4]/div[1]/img/@src').extract();
                expect(img[0]).toBe('/img/author_avatar.jpg');
            }
        }
        let instance = new gachi({
            name: 'Test',
            custom: {},
            program: {
                Spider: Spider,
                middleware: [mid]
            }
        })
        await instance.run()
    })
})