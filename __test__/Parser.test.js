const Parser = require('../object/Parser')

describe('Parse.js', () => {
    it('next()功能:匹配到下一个字符串并且index++', () => {
        const parser = new Parser('hello')
        expect(parser.next('h')).toBe(true)
        expect(parser.index).toBe(1)
    })

    it('current()功能:获取当前index下的字符', () => {
        const parser = new Parser('svelte')
        expect(parser.next('sv')).toBe(true)
        expect(parser.current()).toBe('e')
    })

    it('skip()功能:跳过空白字符',() => {
         const parser = new Parser(`
         <div></div>`)
         parser.skip()
         expect(parser.next('<')).toBe(true)
         expect(parser.index).toBe(11)
    })

    it("readUntil()功能一:消费到指定的ch", () => {
        const parser = new Parser(`<div>`);
        parser.next("<");
        expect(parser.readUntil(">")).toBe("div");
      });
    
    it("readUntil()功能二:没有匹配到指定的ch,返回当前整个str", () => {
        const parser = new Parser(`div`);
        expect(parser.readUntil(">")).toBe("div");
     });
    
})
