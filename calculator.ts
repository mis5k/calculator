
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
    public isDigit(str: string): boolean {
        return (str >= '0' && str <= '9');
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
              if(input[i] == '-' && (i == 0 || !this.isDigit(input[i-1]))) {
                 let temp:string = "";
                 do {
                   temp += input[i++];
                 } while(i <input.length && !this.isOperator(input[i]));
                 i = i-1;
                 this.exp.push(temp);
                 continue;
              } else if(this.stack.length > 0 
                  && (this.precedence(this.getStackTop()) >= this.precedence(input[i]))) {
                 while(this.stack.length > 0) {
                    let a = this.stack.pop();
                    this.exp.push(a);
                 }
              }
              this.stack.push(input[i]);
           } else if(this.isDigit(input[i])) {
              let temp:string = "";
              do {
                temp += input[i++];
              } while(i <input.length && !this.isOperator(input[i]));
              i = i-1;
              this.exp.push(temp);
           }
        } 
        if(this.stack.length > 0) {
            while(this.stack.length > 0) {
               let a =  this.stack.pop();
               this.exp.push(a);
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
           if(this.isOperator(this.exp[i])) {
               let right:number = Number(this.stack.pop());
               let left:number = Number(this.stack.pop());
               let val:number = this.evaluateOperator(this.exp[i], left, right);
               this.stack.push(String(val));
           } else {
                 this.stack.push(this.exp[i]);
           }
        }        
    }
    public getResult(str: string): string {
        this.postfix(str);
        this.calc();
        return this.stack.pop();
    }
}

let exp_temp:string = "0";
let c:Calculator = new Calculator();

function clickBtn(input:string) {
    exp_temp += input;
    document.getElementById("mainExp").innerHTML = exp_temp; 
}

function getResult() {
    console.log("getResult");
    let result = c.getResult(exp_temp);
    console.log("result : " + result);
    exp_temp = result;
    document.getElementById("mainExp").innerHTML = exp_temp;
}
function reset() {
    console.log("reset");
    exp_temp = "0";        
    document.getElementById("mainExp").innerHTML = exp_temp; 
}

//let result = c.getResult("2*3+6/2-4");
//let result = c.getResult("2.5*2+6/3");
//let result = c.getResult("-2.5*2-4");
//console.log(result);

