import {spider,gachi, Box, customConfig, urls, RequestOption, spiderRunParam} from '../dist';

function notHasReturnValueTestFunction(){
    return true;
}
describe('gachi', ()=>{
    it('init', ()=>{
        class Spider extends spider{
            constructor(){
                super();
            }
            public run({res}: spiderRunParam): Box {
                return res;
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
            public urls: urls = [['https://gaoneng-www.github.io/', 'GET', {}]]
            public async run({res}: spiderRunParam) {
                let img = res?.xpath?.('/html/body/div/div[4]/div[1]/img/@src');
                expect(img?.extract?.()[0]).toBe('/img/author_avatar.jpg');
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
            Reflect.set(opt.value, 'isChange', true);
            expect(opt.value['isChange']).toBe(true)
        }
        class Spider extends spider{
            open(config: customConfig): void {
                console.log('is open');
            }
            run({ engine, res, config }: spiderRunParam): void {

            }
            shutdown(config: customConfig): void {
                console.log('is shutdown');
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