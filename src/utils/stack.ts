
interface StackInterface<T> {
    /** 出栈方法，返回栈顶的元素 */
    pop(): T;
    /** 进栈方法，将一个元素推入栈中 */
    push(item: T): void;
    /** 栈长度 */
    size: number;
    /** 返回栈结构,顺序是栈顶->栈底 */
    checkStack(): Array<T>;
}

/**
 * 使用数组简单模拟生成一个栈实例供使用
 * @author chrislee
 * @Time 2020/6/4
 */
class Stack<T> implements StackInterface<T> {
    private stackList: Array<T> = [];

    public size = 0;

    constructor(initState: T | T[]) {
        if (initState instanceof Array) {
            this.stackList = initState;
        } else {
            this.stackList.push(initState);
        }
        this.size = this.stackList.length;
    }

    pop(): T {
        if (this.size < 1) {
            throw Error(`Can't find any items in stack!`);
        } else {
            const result = this.stackList.pop() as T;
            this.size = this.stackList.length;
            return result;
        }
    }

    push(item: T): void {
        this.stackList.push(item);
        this.size = this.stackList.length;
    }

    checkStack(): Array<T> {
        const result: Array<T> = [];
        // let idx: number = this.stackList.length - 1;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.stackList.length; i++) {
            result.unshift(this.stackList[i]);
        }
        return result;
    }
}

export default Stack;
