//遍历 ast
function walk(ast, { exit, enter }) {
    if (ast?.children?.length === 0) {
      exit(ast);
    } else if (ast.type === "text" || ast.type === "mustache") {
      exit(ast);
    } else {
      // Element
      ast.children.forEach((node) => {
        node.parent = ast;
        enter(node);
        walk(node, { exit, enter });
      });
      exit(ast);
    }
  }
  
  module.exports = walk;