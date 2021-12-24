//** A doubly-linked list implementation */
export class easyLinkedList<T> {
    private _head: listNode<T>;
    private _tail: listNode<T>;
    private _size: number;

    /**
     * Creates an instance of easyList, and initialize and set the head and tail's sentinel nodes
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
     * Executes a provided function once for each array elemetn
     * 
     * ``` typescript
     * list.forEach((e) => {
     *     console.log(e);
     * }) 
     * ```
     * 
     * @param  {callbackFn} - The callback function
     */
    forEach(callbackFn: (e: T | undefined, i: number, l: this) => void): void {
        let index = 0;
        for(let elem = this._head; elem != this._tail.nextNode; elem = elem.nextNode) {
            callbackFn(elem.data, index++, this);
        }
    }

    /**
     * Adds a value at the end of the list. 
     *
     * @return {this} - Returns itself so it can be changed
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
     * @throws RangeError If index provided is out of range
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

    /**
     * Get a element's data at a given index
     * 
     * @throws RangeError If provided is out of range
     * @return The element at given index's data
     */
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
     * @throws RangeError If index provided is out of range
     * @return The removed element's data
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
     * Removes the last element in the list. 
     *
     * @throws RangeError if list is empty
     * @return The removed element's data
     */
    public pop(): T | undefined {
        if(this._size == 0)
        {
            throw new RangeError();
        }

        const currElem = this._tail
        currElem.prevNode.nextNode = this._tail.nextNode;
        this._tail = currElem.prevNode;
        currElem.prevNode = new listNode<T>();
        this._size--;
        if(this._size == 0)
            this._head = currElem.prevNode;

        return currElem.data;
    }

    /**
     * Removes the first element, and returns it
     *
     * @throws RangeError If list is blank
     * @return The removed element's data
     */
    public shift(): T | undefined {
        if(this._size == 0)
        {
            throw new RangeError();
        }

        const currElem = this._head;
        currElem.nextNode.prevNode = this._head.nextNode;
        this._head = currElem.nextNode;
        currElem.prevNode = new listNode<T>();

        this._size--;
        if(this._size == 0) {
            this._tail = currElem.nextNode;
        }
        return currElem.data;
    }
    
    /**
     * Adds the specified element to the front of the list
     *
     * @return Iteself to allow method chaining
     */
    public unshift(elem : T | undefined): this {
        // This would still give us O(1) performance, as the loop inside add will never run
        this.add(0, elem);
        return this;
    }

	/**
     * Replaces an element with the specified element at a given index
     *
     */
    public set(index: number, element: T): void {
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
	}   

    /**
     * Check if list is empty
     *
     * @return True if list is empty, return false otherwise
     */
    public isEmpty(): boolean {
        if(this._size === 0)
            return true;
        else
            return false;
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

/** 
 * A single node of a doubly linked list. **If you're seeing this then it's a bug! This should be internal!!!** 
 * @internal
 */
export class listNode<T> {
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

    /** @internal */
    get nextNode(): listNode<T> {
        if(this._next === undefined)
            throw new ReferenceError("Node's next was undefined");
        return this._next;
    }

    /** @internal */
    set nextNode(next : listNode<T>) {
        this._next = next;
    }

    get prev(): T | undefined {
        return this._prev?.data;
    }

    /** @internal */
    get prevNode(): listNode<T> {
        if(this._prev === undefined)
            throw new ReferenceError("Node's next was undefined");
        return this._prev;
    }

    /** @internal */
    set prevNode(prev: listNode<T>) {
        this._prev = prev; 
    }

    get data(): T | undefined {
        return this._data;
    }

    set data(data: T | undefined) {
        this._data = data;
    }

    /** @internal */
    get node() {
        return this;
    }
}