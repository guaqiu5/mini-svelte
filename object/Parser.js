class Parser {
    constructor(raw) {
        this.raw = raw
        this.index = 0
    }

    next(string) {
        // Todo string过长的边界处理...
        if(this.raw.slice(this.index,this.index + string.length) === string){
            this.index += string.length
            return true
        }else{
            return false
        }
    }

    current() {
        return this.raw[this.index]
    }

    readUntil(string) {

    }

    //方便format 去掉空白
    skip() {
        while(this.current() <= ' '){
            this.index ++
        }
    }

    readUntil(string) {
        let str = "";
        let ch = "";
    
        while (((ch = this.current()), ch !== string)) {
          if (this.index >= this.raw.length) {
            return str;
          }
          str += ch;
          this.index++;
        }
        return str;
    }
}

module.exports = Parser