// main.js
import LinkedList from "./LinkedList.js";

const list = new LinkedList();

// Initial List Setup
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

list.prepend("lion");

console.log("--- List State ---");
console.log(`List: ${list.toString()}`);
console.log(`Size: ${list.size}`);
console.log(`Head: ${list.head.value}`);
console.log(`Tail: ${list.tail.value}`);
console.log(`at(3): ${list.at(3).value}`);
console.log(`contains('hamster'): ${list.contains("hamster")}`);
console.log(`find('snake'): ${list.find("snake")}`);

// Test Pop
list.pop();
console.log(`\nList after pop: ${list.toString()}`);

// Test Extra Credit
list.insertAt("monkey", 1);
list.removeAt(0);

console.log(`\nList after insertAt(monkey, 1) and removeAt(0): ${list.toString()}`);