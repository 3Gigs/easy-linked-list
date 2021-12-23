export class linkedList<T> {
    private _head: listNode<T>;
    private _tail: listNode<T>;
    private _size: number;

    /**
     * Initializes the head and tail with sentinel nodes
     * @memberof linkedList
     */
    constructor() {
        this._head = new listNode<T>(undefined);
        this._tail = new listNode<T>(undefined);
        this._head.nextNode = this._tail;
        this._tail.nextNode = this._head;
        this._size = 0;
    }

    *[Symbol.iterator]() {
        let currElem = this._head;
        for(let i = currElem; i !== this._tail.nextNode; i = i.nextNode) {
            yield i.data;
        }
    }

    /**
     * Adds a value at the end of the list
     *
     * @param {(T | undefined)} data
     * @return {*}  {this}
     * @memberof linkedList
     */
    public push(data: T | undefined): this {
        const newElem = new listNode<T>(data);

        newElem.prevNode = this._tail;
        // Not having a next implies that the tail should be a sentinel
        if(!this._tail.nextNode)
            newElem.nextNode = this._tail;
        else
            newElem.nextNode = this._tail.nextNode;
        this._tail.nextNode = newElem;
        this._tail = newElem;
        if(this._size == 0)
            this._head = newElem;
        this._size++;

        return this;
    }
    
    /**
     * Adds an element at a specified index, shifting the previous one forward
     *
     * @param {number} index
     * @param {(T | undefined)} elem
     * @memberof linkedList
     */
    public add(index: number, elem: T | undefined): void {
        if(index < 0 || index != 0 && index >= this._size)
            throw new RangeError("Index provided is out of range!");
        
        const newNode = new listNode<T>(elem);
        let currElem = this._head;

        for(let i = 0; i < index; i++) {
            // Should not happen
            if(currElem.nextNode === undefined)
                throw new RangeError("Element's next node is undefined")
            currElem = currElem.nextNode;
        }

        if(this._size === 0)
        {
            newNode.prevNode = this._head;
            newNode.nextNode = this._tail;
            this._head = newNode;
            this._tail = newNode;
        }
        else {
            newNode.prevNode = currElem.prevNode;
            newNode.nextNode = currElem;
            currElem.prevNode.nextNode = newNode;
            currElem.prevNode = newNode;
        }

        if(index === 0) {
            this._head = newNode;
        }

        this._size++;
    }

    public get(index: number): T | undefined {
        let currElem = this._head;

        if(index < 0 || index >= this.size) {
            throw new RangeError("Index provided is out of range!");
        }

        for(let i = 0; i < index; i++) {
            currElem = currElem.nextNode;
        }

        return currElem.data;
    }

    /**
     * Removes an element at a provided index
     *
     * @param {number} index
     * @return {*}  {(T | undefined)} The element data of the value removed
     * @memberof linkedList
     */
    public remove(index: number): T | undefined {
        if(index < 0 || index >= this.size)
            throw new RangeError("Index provided is out of range!");
        
        let currElem: listNode<T> = this._head;

        for(let i = 0; i < index; i++) {
            currElem = currElem.nextNode;
        }

        currElem.prevNode.nextNode = currElem.nextNode;
        currElem.nextNode.prevNode = currElem.prevNode;

        if(currElem === this._head) 
            this._head = currElem.nextNode;
        if(currElem === this._tail) {
            this._tail = currElem.prevNode;
        }

        this.size--;
        return currElem.data;
    }

	/**
     * Replaces an element with the specified element at a given index
     *
     * @param {number} index
     * @param {T} element
     * @return {*}  {(T | undefined)}
     * @memberof linkedList The value of the old element
     */
    public set(index: number, element: T): T | undefined {
		if(index < 0 || index >= this.size)
			throw new RangeError("Index provided is out of range!");
		
		const newElem = new listNode<T>(element);
		let currElem = this._head;
		
		for(let i = 0; i < index; i++)
		{
			currElem = currElem.nextNode;
		}
		
		newElem.nextNode = currElem.nextNode;
		newElem.prevNode = currElem.prevNode;
		currElem.prevNode.nextNode = newElem;
		
		if(this._head == currElem)
		{
			this._head = newElem;
		}
		if(this._tail == currElem)
		{
			this._tail = newElem;
		}
		
		currElem = newElem;
		
		return currElem.data;
	}   

    get size(): number {
        return this._size;
    }

    set size(s: number) {
        this._size = s;
    }

    get head(): T | undefined {
        return this._head.data;
    }

    get tail(): T | undefined {
        return this._tail.data;
    }
}

class listNode<T> {
    private _next: listNode<T> | undefined;
    private _prev: listNode<T> | undefined;
    private _data: T | undefined;

    /**
     * Creates an instance of listNode its data passed in
     * @param {T} data
     * @memberof listNode
     */
    constructor(data?: T) {
        this._data = data;
    }

    get next() : T | undefined {
        return this._next?.data;
    }

    get nextNode(): listNode<T> {
        if(this._next === undefined)
            throw new ReferenceError("Node's next was undefined");
        return this._next;
    }

    set nextNode(next : listNode<T>) {
        this._next = next;
    }

    get prev(): T | undefined {
        return this._prev?.data;
    }

    get prevNode(): listNode<T> {
        if(this._prev === undefined)
            throw new ReferenceError("Node's next was undefined");
        return this._prev;
    }

    set prevNode(prev: listNode<T>) {
        this._prev = prev; 
    }

    get data(): T | undefined {
        return this._data;
    }

    set data(data: T | undefined) {
        this._data = data;
    }

    get node() {
        return this;
    }
}