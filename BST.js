

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.right = null;
        this.left = null;
    }

    insert(key, value) {
        if (this.key === null) {
            this.key = key;
            this.value = value;
        }
        else {
            let direction = null;
            if (key < this.key) {
                direction = 'left';
            } else direction = 'right';

            if (this[direction] === null) {
                this[direction] = new BinarySearchTree(key, value, this);
            }
            else {
                this[direction].insert(key, value);
            }
        }
    }

    remove(key) {
        if (this.key === null) return null;
        if (this.key === key) {
            let replacement = null;
            let min = null;
            if (this.right !== null && this.left !== null) {
                min = this.findMin(this.right);
            }
            else if (this.right !== null) replacement = this.right;
            else if (this.left !== null) replacement = this.left;


            if (min !== null) {
                replacement = min;
                let theirReplacement = null;
                if (replacement.right !== null) theirReplacement = replacement.right;
                else if (replacement.left !== null) theirReplacement = replacement.left;

                this.replace(replacement, theirReplacement);
            }

            this.replace(this, replacement);
        }
        else {
            let direction = null;
            if (key < this.key) {
                direction = 'left';
            } else direction = 'right';

            if (this[direction] === null) return null;
            return this[direction].remove(key);
        }
    }

    replace(my, myReplacement) {
        let myParent = my.parent;
        if (myParent !== null) {
            my.parent = null;

            let myDirection = null;
            if (my.key < myParent.key) {
                myDirection = 'left';
            } else myDirection = 'right';

            myParent[myDirection] = myReplacement;
        }
        else {
            my.key = myReplacement.key;
            my.value = myReplacement.value;
        }

    }

    findMin(tree) {
        if (tree.left === null) {
            return tree;
        }
        return this.findMin(tree.left);
    }

    findMax(tree) {
        if (tree.right === null) {
            return tree;
        }
        return this.findMax(tree.right);
    }

    find(key) {
        if (this === null) return 'Not Found.';
        if (this.key === key) return this.value;

        let direction = null;
        if (key < this.key) {
            direction = 'left';
        } else direction = 'right';

        if (this[direction] === null) return 'Not Found.';
        return this[direction].find(key);
    }
}

class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(value) {
        let newLast = new _Node(value, null);
        if (this.last !== null) {
            this.last.next = newLast;
            this.last = newLast;
        } else {
            this.last = newLast;
            this.first = this.last;
        }
    }

    dequeue() {
        if (this.first !== null) {
            let oldFirst = this.first;
            this.first = this.first.next;
            if(this.first === null) this.last = this.first;
            return oldFirst;
        }

    }
}
const peek = function (qu) {
    if (qu.first === null) return null;
    return qu.first.value;
};

const isEmpty = function (qu) {
    return qu.first === null;
};



//Assignment from here down


function inOrder(bst) {
    if(bst.left !== null) {
        inOrder(bst.left);
    }
    console.log(bst.key);
    if(bst.right !== null) {
        inOrder(bst.right);
    }
    return;
}

function preOrder(bst) {
    console.log(bst.key);
    if(bst.left !== null) {
        preOrder(bst.left);
    }
    if(bst.right !== null) {
        preOrder(bst.right);
    }
    return;
}

function postOrder(bst) {
    if(bst.left !== null) {
        postOrder(bst.left);
    }
    if(bst.right !== null) {
        postOrder(bst.right);
    }
    console.log(bst.key);
    return;
}

function breadth(bst) {
    let qu = new Queue();
    
    qu.enqueue(bst);
    let storage = [];

    while(!isEmpty(qu)) {
        let current = qu.dequeue();
        console.log(current.value.value);
        storage.push(current.value.value);

        if(current.value.left !== null) qu.enqueue(current.value.left);
        if(current.value.right !== null) qu.enqueue(current.value.right);
    }
    
    return storage;
}

function maxProfit(arr) {
    let maxBST = new BinarySearchTree();
    for(let i = 0; i < arr.length - 1; i++) {
        let profit = arr[i + 1] - arr[i];
        maxBST.insert(profit);
    }
    
    let maximumProfit = maxBST.findMax(maxBST).key;
    return maximumProfit;
}



function egg(breakingFloor, numberOfFloors) {
    if(numberOfFloors <= 0 ) throw new Error('Number of floors must be positive.');
    if(breakingFloor > numberOfFloors || breakingFloor <= 0) throw new Error('Breaking floors must be positive and <= the number of floors.');

    let discriminant = (numberOfFloors * 8) -1;
    let squRoot = Math.sqrt(discriminant);
    let optimalFloor = Math.ceil((squRoot - 1) / 2);

    console.log('Best floor to start dropping eggs = ' + optimalFloor);

    let eggs = 2;
    let counter = 0;

    function drop(guess, breakingFloor) {
        if(guess > numberOfFloors) guess = numberOfFloors;
        if(guess < breakingFloor) {
            console.log(`Dropped from floor ${guess}....     The egg survived`);
            counter++;
            if(eggs === 2) {
                optimalFloor--;
                return drop(guess + optimalFloor, breakingFloor);
            } else {
                return drop(guess + 1, breakingFloor);
            }
        }
        else if(guess >= breakingFloor) {
            console.log(`Dropped from floor ${guess}....     The egg broke`);
            counter++;
            if(eggs === 2) {
                eggs--;
                optimalFloor--;
                return drop(guess - optimalFloor, breakingFloor);
            }
            else {
                return guess - 1;
            }
        }
    }

    let foundFloor = drop(optimalFloor, breakingFloor);

    return `Highest floor at which the egg does not break: ${foundFloor}, it took ${counter} tries to figure out.`;
}


function main() {
    let data = '25 15 50 10 24 35 70 4 12 18 31 44 66 90 22';
    let arr = data.split(' ');
    arr = arr.map(item => {
        return parseInt(item);
    });
    //console.log(arr);
    
    
    let bst = new BinarySearchTree();

    arr.forEach(item => {
        bst.insert(item);
    });


    console.log('in Order:');
    console.log(' ');
    inOrder(bst);
    console.log(' ');
    console.log(' ');

    console.log('pre Order:');
    console.log(' ');
    preOrder(bst);
    console.log(' ');
    console.log(' ');

    console.log('post Order:');
    console.log(' ');
    postOrder(bst);
    console.log(' ');
    console.log(' ');


    let commanders = new BinarySearchTree();
    let commanderData = ['Captain Picard', 'Commander Riker', 'Lt. Cmdr. Worf', 'Lt. Cmdr. LaForge', 'Lieutenant security-officer', 'Commander Data', 'Lt. Cmdr. Crusher', 'Lieutenant Selar'];
    let treePlacement = [5, 3, 2, 4, 1, 6, 8, 7];

    for(let i = 0; i < commanderData.length; i ++) {
        commanders.insert(treePlacement[i], commanderData[i]);
    }

    console.log('Order of Inheritance:');
    console.log(' ');
    breadth(commanders);
    console.log(' ');
    console.log(' ');


    let sharePrices = [128, 97, 121, 123, 98, 97, 105];
    console.log('Best price:');
    console.log(' ');
    console.log(maxProfit(sharePrices));
    console.log(' ');
    console.log(' ');




    console.log(egg(36, 1000));
    console.log(' ');
    console.log(' ');
}

main();