import linkedList from "../lib/linkedList";
import { assert } from "chai"

describe("Linked List:", () => {
    describe("#push", () => {
        const tList = new linkedList<Number>();
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
        const emptyList = new linkedList<Number>();
        const simpleList = new linkedList<Number>();
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
        const simpleList = new linkedList<number>();
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
        const emptyList = new linkedList<number>();
        const simpleList = new linkedList<number>();
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
            const simpleList = new linkedList<Number>();
            simpleList.push(1);
            simpleList.push(2);
            simpleList.push(3);
            simpleList.add(0, 420);
            assert.equal(simpleList.get(1), 1);
        })
        it("Should correctly update head and tail if needed", () => {
            const simpleList = new linkedList<Number>();
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
        const emptyList = new linkedList<number>();
        const simpleList = new linkedList<number>();
        simpleList.push(1);
        simpleList.push(2);
        simpleList.push(3);
        
        it("Should throw an error (removing something from an empty list)", () => {
            try {
                emptyList.remove(0);
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
})