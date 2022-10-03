const parse = require('../../object/parseTemplate')
const walk = require('../walk')
describe('walk', () => {

    it("按照期望顺序遍历(enter)", () => {
        const ast = parse(`<div><span></span></div>`);
        const result = [];
        walk(ast, {
          enter: (node) => result.push(node.type + node.name + node.data),
          exit: () => {},
        });
        expect(result).toEqual(["Elementdiv", "Elementspan"]);
      })

      it("能够按照期望顺序遍历(exit)", () => {
        const ast = parse(`<div><span>123</span></div>`);
        const result = [];
        walk(ast, {
          enter: () => {},
          exit: (node) => result.push(node.type + node.name + node.data),
        });
        expect(result).toEqual([
          "Text123",
          "Elementspan",
          "Elementdiv",
          "Fragment",
        ]);
      });
})