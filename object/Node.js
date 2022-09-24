class Node {
    constructor() {
      this.start = 0;
      this.end = 0;
      this.type = ""; // element / text / fragment
      this.name = ""; // tagname
      this.selfClosing = false; // 如<video /> 自闭和标签
      this.data = "";
      this.attrs = []; // attributes
      this.children = []; 
    }
  }
  
  module.exports = Node;
  