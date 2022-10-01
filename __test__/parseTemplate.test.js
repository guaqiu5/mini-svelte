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

    it('ifBlock缺失右边的括号报错', () => {
        expect(() => parseTemplate(`{#if hhhh`)).toThrow('block is missing')
    })

    it('eachBlock缺失as报错', () => {
        expect(() => parseTemplate(`{#each guaqiu}`)).toThrow('each Block needs as')
    })

    it('eachBlock结点(没有index)', () => {
        expect(parseTemplate(`{#each guaqius as item}`)).toMatchSnapshot()
    })

    it('eachBlock结点(有index)', () => {
        expect(parseTemplate(`{#each guaqius as item,index}`)).toMatchSnapshot()
    })

    it(`block的名字需要对应`, () => {
        expect(() => parseTemplate(`{#each guaqius as item,i}{/if}`)).toThrow('block name should match')
    })

    it('end block', () => {
        expect(parseTemplate(`{#each guaqius as item,i}{/each}`)).toMatchSnapshot()
    })
})