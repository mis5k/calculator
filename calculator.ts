
class Calculator {
    private exp: string[];
    private stack: string[];
    
    public init() {
        this.exp = [];
        this.stack = [];   
    }
    public getStackTop(): string {
        return this.stack[this.stack.length - 1];
    }
    public isStackEmpry():boolean {
        return true;
    }
    public isOperator(str: string): boolean {
        return (str == '+') || (str == '-') || (str == '*') || (str == '/')
    }
    public precedence(op: string): number {
        if(op == '+' || op == '-') {
           return 0;
        } else if(op == '*' || op == '/' ) {
           return 1;
        } else {
           return 2;
        }
    }
    public postfix(input: string) {
        this.init();

        for(let i=0; i<input.length; i++) {
           if(this.isOperator(input[i])) {
              if(this.stack.length > 0 
                  && (this.precedence(this.getStackTop()) >= this.precedence(input[i]))) {
                 while(this.stack.length > 0) {
                    this.exp.push(this.stack.pop());
                 }
              }
              this.stack.push(input[i]);
           } else if(input[i] >= '0' && input[i] <= '9') {
              let temp:string = input[i];
              for(let j=i+1; j <input.length; j++) {
                if(this.isOperator(input[j])) {
                    i = j-1;  
                    break;
                }
                temp += input[j];
              }
              this.exp.push(temp);
           }
        } 
        if(this.stack.length > 0) {
            while(this.stack.length > 0) {
               this.exp.push(this.stack.pop());
            }
        }
    }
    public evaluateOperator(op: string, left: number, right: number): number {
        switch (op) {
            case "+": return left + right;
            case "-": return left - right;
            case "*": return left * right;
            case "/": return left / right;
        }
    }
    public calc() {
        this.stack = [];
        for(let i=0; i<this.exp.length; i++) {
           if(this.exp[i] >= '0' && this.exp[i] <= '9') {
               this.stack.push(this.exp[i]);
           } else if(this.isOperator(this.exp[i])) {
               let right:number = Number(this.stack.pop());
               let left:number = Number(this.stack.pop());
               let val:number = this.evaluateOperator(this.exp[i], left, right);
               this.stack.push(String(val));
           }
        }        
    }
    public getResult(str: string): string {
        this.postfix(str);
        this.calc();
        return this.stack.pop();
    }
}
let exp_temp:string = "";

function clickBtn(input:string) {
    console.log("A");
    exp_temp += input;
    document.getElementById("mainExp").innerHTML = exp_temp; 
}

function getResult() {
    console.log("getResult");
    let c = new Calculator();
    let result = c.getResult(exp_temp);
    console.log("result : " + result);
    exp_temp = result;
    document.getElementById("mainExp").innerHTML = exp_temp;
}
function reset() {
    console.log("reset");
    exp_temp = "";        
    document.getElementById("mainExp").innerHTML = exp_temp; 
}

//let c:Calculator = new Calculator();
//let result = c.getResult("2*3+6/2-4");
//let result = c.getResult("2.5*2+6/3");
//console.log(result);