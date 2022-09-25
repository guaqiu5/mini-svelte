const parseTemplate = require('../object/parseTemplate')

describe('parseTemplate', () => {
    it('解析html模板', () => {
        expect(parseTemplate(`<div class="wrapper"/>`)).toMatchSnapshot()
    })

    it('得到text', () => {
        expect(parseTemplate(`<div>Hello Svelte</div>`)).toMatchSnapshot()
    })
})