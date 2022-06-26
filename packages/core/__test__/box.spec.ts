import { box } from "../src/Box/box"
import { Box } from "../src/types/Box";

describe('box', ()=>{
    const html = `<h1>HelloWorld</h1>`
    it('default', ()=>{
        const defaultBox = box(html, false);
        expect(defaultBox?.xpath?.('//h1/text()').extract()[0]).toBe('HelloWorld');
    })
    it('extract', ()=>{
    })
})