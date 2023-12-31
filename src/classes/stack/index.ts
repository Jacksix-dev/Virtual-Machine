import { hexlify } from "@ethersproject/bytes";
import { MAX_UNIT256 } from "../../constants";
import { StackOverflow, StackUnderflow, InvalidStackValue, IndexOutOfBounds } from "./errors";

class Stack{

    private readonly maxDepth;
    private stack: bigint[];

    constructor(maxDepth=1024){
        this.maxDepth = maxDepth;
        this.stack=[];
    }

    public push(value: bigint):void{
if (value <0 || value> MAX_UNIT256)
throw new InvalidStackValue(value);

if(this.stack.length + 1 > this.maxDepth)

throw new StackOverflow()
    this.stack.push(value)
}

    public pop():bigint{
    const value = this.stack.pop()
       if(value === undefined) throw new StackUnderflow() 
       return value
    }

    public duplicate (index: number):void{
        const value = this.stack[this.toStackIndex(index)]
    if (value === undefined) throw new IndexOutOfBounds();
    this.stack.push(value)
    }

    public swap(indexA:number,indexB:number):void{
        const adjustedIndexA = this.toStackIndex(indexA)
        const adjustedIndexB = this.toStackIndex(indexB)
    
        const a = this.stack[adjustedIndexA]

        if(a === undefined) throw new IndexOutOfBounds();
        const b = this.stack [adjustedIndexB]
        if(b===undefined) throw new IndexOutOfBounds()

        this.stack[adjustedIndexA]=b;
        this.stack[adjustedIndexB]=a
    }

    private toStackIndex(index:number){
        return this.stack.length - index
    }
    public print():void{
        console.log(`Stack:\t`,
        this.stack.map((value) => hexlify(value))
    )
}
}

export default Stack