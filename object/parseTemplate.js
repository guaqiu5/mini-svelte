const Parser = require('./Parser')
const Node = require('./Node')
function parse(content){
    let stack = []
    const parser = new Parser(content);
    const root = new Node();
    root.start = parser.index;
    root.type = "Fragment";

    function reachTagName() {
    const node = new Node()
    node.start = parser.index - 1
    // <div class=""> 遇到空白或者> 取到tagname 正则方便一点
    const tagName = parser.readUntilPattern(/ |\>/)
    node.name = tagName
    node.type = 'Element'
    reachAttrs(node)
   if(parser.next('>')){
        console.log(1)
        stack.push(node)
        return node
    }else if(parser.next("/>")){
        // <video /> 自闭和标签
        console.log('这里')
        node.selfClosing = true
        node.end = parser.index
    }
    return node
    }

    function endTagName(){
    const tagName = parser.readUntil('>')
    const currentNode = stack.pop()
    currentNode.end = parser.index
    parser.next('>')
    if(currentNode.name !== tagName){
        throw new Error('标签名称不对应哦')
     }
    }

    function reachAttrs(node) {
    // key=value
    parser.skip();
    let ch = "";
    let key = "";

    if (parser.current() === "/" || parser.current() === ">") {
      return;
    }

    while (((ch = parser.current()), ch !== ">" && ch !== "=" && ch !== ":")) {
      // TODO: for now, only support `=`
      key += ch;
      parser.index += 1;
        }

    node.attrs.push({
      name: key,
      ...attr_value(),
        });

    parser.skip();

    if (parser.current() !== ">" && parser.current() !== "/") {
      attrs(node);
        }
    }

    function attr_value() {
    // TODO: handle `:`, {expression}
    // <div data-modal={} />
    if (parser.next("=")) {
      if (parser.next('"')) {
        const value = parser.readUntil('"');
        parser.next('"');
        return {
          value,
          type: "Attribute",
        };
      }
     }
    }

    function reachBlock() {
      const validBlockNames = ['if','each','await']
      let node = new Node()
      node.start = parser.index
      const thisBlockName = parser.readUntil(' ')
      if(!validBlockNames.includes(thisBlockName)) {
        throw new Error(`${thisBlockName} is not support yet`)
      }
      node.type = `${thisBlockName} Block`
      if(node.type === 'if Block'){
        // {#if condition}
        const condition = parser.readUntil('}')
        node.data = {
          ifCondition: condition.trim()
        }
      }else if(node.type === 'each Block'){
        // {#each expression as name, index}...{/each}
        const variableExpression = parser.readUntil(' ')
      }
      if(parser.next('}')) return node
      else throw new Error('block is missing }')
    }


    function reachText() {
    // '>'
    const node = new Node()
    node.start = parser.index
    const plainText = parser.readUntil('<')
    node.data = plainText
    node.end = parser.index
    node.type = 'Text'
    return node
    }

    function parseTemplate() {
    let ch = parser.current();
    parser.skip();
    while (((ch = parser.current()), ch)) {
        let currentNode = null
        if(stack.length === 0) {
            currentNode = root
            } else {
            currentNode = stack[stack.length-1]
         }
         // tag end
        if(parser.next('</')){
            endTagName()
            parseTemplate()
            } else if(parser.next('<')){
              // tag start
            console.log('push tag')
           currentNode.children.push(reachTagName())
         } else if(parser.next('{#')){
            // block scope
            currentNode.children.push(reachBlock())
         }else {
          // text
            currentNode.children.push(reachText())
        }
    
        }
     parser.skip()
    root.end = parser.index
    return root
    }

 return parseTemplate()
}


module.exports = parse