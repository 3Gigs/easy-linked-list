## **Easy-List**: Simple Doubly Linked-List implementation
Because I found out JavaScript didn't have linked lists...  
## Getting Started
**ES6 is required.**  
### Installation  
```bash
npm install easy-list@latest
```
### Basic Usage
Supports both Typescript and Javascript  
**Typescript importing**
```typescript
import { easyList } from 'easy-linked-list'
**CommonJS importing**
```
```javascript
const { easyList } = require('easy-linked-list')
```
```javascript
const list = new easyList<Number>();
list.push(1).push(2).push(3).push(4); // [ 1, 2, 3, 4 ]
list.pop() // [ 1, 2, 3 ]
list.shift() // [ 2, 3 ]
list.unshift(1).unshift(0) // [ 0, 1, 2, 3 ]
list.isEmpty() // false
list.set(1, 4) // [ 0, 4, 2, 3 ]
```
