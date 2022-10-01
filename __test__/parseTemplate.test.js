const parseTemplate = require('../object/parseTemplate')

describe('parseTemplate', () => {
    it('解析html模板', () => {
        expect(parseTemplate(`<div class="wrapper"/>`)).toMatchSnapshot()
    })

    it('得到text', () => {
        expect(parseTemplate(`<div>Hello Svelte</div>`)).toMatchSnapshot()
    })

    it('不符合if each wait的block抛出异常', () => {
        expect(() => parseTemplate(`{#guaqiu }`)).toThrow('guaqiu is not support yet')
    })

    it(`ifblock结点`, () => {
        expect(parseTemplate(`{#if guaqiu}`)).toMatchSnapshot()
    })

    it('ifBlock缺失右边的括号', () => {
        expect(() => parseTemplate(`{#if hhhh`)).toThrow('block is missing')
    })
})