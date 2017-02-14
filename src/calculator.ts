
export class Calculator {
    private exp: string[];
    private stack: string[];
    
    public init() {
        this.exp = [];
        this.stack = [];   
    }
    public getStackTop(): string {
        return this.stack[this.stack.length - 1];
    }
    public isStackEmpty():boolean {
        return (this.stack.length > 0) ? false : true;
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
           if(this.isDigit(input[i]) 
                 ||(input[i] == '-' && (i == 0 || !this.isDigit(input[i-1])))) {
              let temp:string = "";
              do {
                temp += input[i++];
              } while(i <input.length && !this.isOperator(input[i]));
              i--;
              this.exp.push(temp);
           } else if(this.isOperator(input[i])) {
              if(!this.isStackEmpty() 
                  && (this.precedence(this.getStackTop()) >= this.precedence(input[i]))) {
                 while(!this.isStackEmpty()) {
                    this.exp.push(this.stack.pop());
                 }
              }
              this.stack.push(input[i]);
           }
        } 

        while(!this.isStackEmpty()) {
            this.exp.push(this.stack.pop());
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
               let right = Number(this.stack.pop());
               let left = Number(this.stack.pop());
               let val = this.evaluateOperator(this.exp[i], left, right);
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

