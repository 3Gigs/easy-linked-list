import { easyList } from "../src/";
import { assert } from "chai"

describe("Linked List:", () => {
    describe("#push", () => {
        const tList = new easyList<Number>();
        it("Should push a value 1 from an empty list", () => {
            tList.push(1);
            assert.equal(tList.get(0), 1);
        });
        it("Should push a value 2 from a list containing value 1", () => {
            tList.push(2);
            assert.equal(tList.get(1), 2);
        });
        it("First value should be head, second value should be tail", () => {
            assert.equal(tList.head, 1);
            assert.equal(tList.tail, 2);
        })
    })
    describe("#get", () => {
        const emptyList = new easyList<Number>();
        const simpleList = new easyList<Number>();
        simpleList.push(1);
        simpleList.push(2);
        simpleList.push(3);
        it("Should throw an error (Getting an element from an empty list)", () => {
            try {
                emptyList.get(0);
                assert.fail();
            }
            catch (e) {}
        });
        it("Should also throw an error (Getting an element from index -1)", () => {
            try {
                simpleList.get(-1);
                assert.fail();
            }
            catch(e) {}
        })
        it("Should also throw an error (Getting an element outside of list's range)", () => {
            try {
                simpleList.get(3);
            }
            catch(e) {}
        });
        it("Should return the correct values for each element", () => {
            assert.equal(simpleList.get(0), 1);
            assert.equal(simpleList.get(1), 2);
            assert.equal(simpleList.get(2), 3);
        })
    })
    describe("Iterator test", () => {
        const simpleList = new easyList<number>();
        const valuesToAdd = [1, 2, 3];
        const valuesFound = new Array();
        simpleList.push(valuesToAdd[0]).push(valuesToAdd[1]).push(valuesToAdd[2]);
        
        for(let val of simpleList) {
            valuesFound.push(val);
        }
        it("Should iterate the same values as the values added", () => {
            for(let i = 0; i < valuesToAdd.length; i++) {
                if(valuesFound[i] != valuesToAdd[i]) {
                    assert.fail();
                }
            }
        })
    })
    describe("#add", () => {
        const emptyList = new easyList<number>();
        const simpleList = new easyList<number>();
        simpleList.push(1);
        simpleList.push(2);
        simpleList.push(3);
        simpleList.add(1, 42);
        it("Should correctly add a value at index 1", () => {
            assert.equal(simpleList.get(1), 42);
            assert.equal(simpleList.get(2), 2);
        })
        it("Should throw an error (Accessing an element at -1)", () => {
            try {
               simpleList.add(-1, 42);
               assert.fail();
            }
            catch(e) {}
        })
        it("Should throw an error (Accessing an element outside of list's range)", () => {
            try {
                simpleList.add(42, 0);
                assert.fail();
            }
            catch(e) {}
        })
        it("Should correctly shift the old element to the right", () => {
            const simpleList = new easyList<Number>();
            simpleList.push(1);
            simpleList.push(2);
            simpleList.push(3);
            simpleList.add(0, 420);
            assert.equal(simpleList.get(1), 1);
        })
        it("Should correctly update head and tail if needed", () => {
            const simpleList = new easyList<Number>();
            simpleList.push(1);
            simpleList.push(2);
            simpleList.push(3);
            simpleList.add(0, 50)
            simpleList.add(simpleList.size - 1, 25);

            assert.equal(simpleList.get(0), simpleList.head);
            assert.equal(simpleList.get(simpleList.size - 1), 3);
        })
        it("Should correctly add an element in an empty list", () => {
            emptyList.add(0, 1);
            assert.equal(emptyList.get(0), 1);
            // Keeping it empty!
            emptyList.remove(0);
        })
    })
    describe("#remove", () => {
        const emptyList = new easyList<number>();
        const simpleList = new easyList<number>();
        simpleList.push(1);
        simpleList.push(2);
        simpleList.push(3);
        
        it("Should throw an error (removing something from an empty list)", () => {
            try {
                emptyList.remove(0);
                assert.fail();
            }
            catch(e) {}
        })
        it("Should remove the element off of the list", () => {
            const removedValue = simpleList.remove(1);
            for(let i of simpleList) {
                if(i == removedValue) {
                    assert.fail();
                }
            }
        })
    })
    describe("#pop", () => {
        it("Should no longer have the value 4 in the list", () => {
            const simpleList = new easyList<Number>();
            simpleList.push(1).push(2).push(3).push(4);
            simpleList.pop();
            for(let e of simpleList) {
                if(e == 4) {
                    assert.fail();
                }
            }
        })
        it("Should properly update tail", () => {
            const simpleList = new easyList<Number>();
            simpleList.push(1).push(2).push(3).push(4);
            simpleList.pop();
            assert.notEqual(simpleList.tail, 4);
        })
        it("Should properly update head", () => {
            const simpleList = new easyList<Number>();
            simpleList.push(1).push(2);
            simpleList.pop();
            assert.equal(simpleList.head, 1);
            simpleList.pop();
            assert.equal(simpleList.head, undefined);
        })
        it("Should throw error on an empty list", () => {
            const list = new easyList();
            try {
                list.pop();
                assert.fail();
            }
            catch(e) {}
        })
    })
    describe("#shift", () => {
        it("Should properly remove the first element", () => {
            const simpleList = new easyList<number>();
            simpleList.push(1).push(2).push(3).push(4).push(5);
            simpleList.shift();
            for(let e of simpleList) {
                if(e == 1) {
                    assert.fail();
                }
            }
        })
        it("Should properly update head and tail", () => {
            const simpleList = new easyList<number>();
            simpleList.push(1);
            simpleList.shift();
            assert.equal(simpleList.head, undefined);
            assert.equal(simpleList.tail, undefined);
        })
        it("Should throw error on an empty list", () => {
            const list = new easyList();
            try {
                list.shift();
                assert.fail();
            }
            catch(e) {}
        })
    })
})