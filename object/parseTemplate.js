const Parser = require('./Parser')
const Node = require('./Node')

let stack = []
const parser = new Parser(`<div />`);
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
   if(parser.next('>')){
        stack.push(node)
        return node
    }else if(parser.next(" />")){
        // <video /> 自闭和标签
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
        if(parser.next('</')){
            endTagName()
            parseTemplate()
        }else if(parser.next('<')){
            console.log('push tag')
           currentNode.children.push(reachTagName())
        }
    
    }
    parser.skip()
    root.end = parser.index
    return root
}

parseTemplate()
console.log(root)
module.exports = parseTemplate