const parse = require('../../object/parseTemplate')
const walk = require('../walk')
describe('walk', () => {

    it("按照期望顺序遍历", () => {
        const ast = parse(`<div><span></span></div>`);
        const result = [];
        walk(ast, {
          enter: (node) => result.push(node.type + node.name + node.data),
          exit: () => {},
        });
        expect(result).toEqual(["Elementdiv", "Elementspan"]);
      })
})