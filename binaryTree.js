class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Tree
//             a
//           / \
//          b   c
//        / \   \
//      d    e   f

// Depth first - a, b, d, e, c, f

// // Itterable
// const itterableDepthFirstValues = (root) => {
//   if (root === null) return [];

//   const result = [];
//   const stack = [root];

//   while (stack.length > 0) {
//     const current = stack.pop();
//     result.push(current.val);

//     current.right && stack.push(current.right);
//     current.left && stack.push(current.left);
//   }

//   return result;
// };

// // Recurrsion
// const recurrsionDepthFirstValues = (root) => {
//   if (!root.length) return [];

//   const leftValues = depthFirstValues(root.left);
//   const rightValues = depthFirstValues(root.right);
//   return [root.val, ...leftValues, ...rightValues];
// };

// // Itterable
// const breadthFirstValues = (root) => {
//   if (root === null) return [];

//   const value = [];
//   const queue = [root];

//   while (queue.length > 0) {
//     // Remove node from the start
//     const current = queue.shift();
//     value.push(current.val);

//     // Add node to the end
//     current.left && queue.push(current.left);
//     current.right && queue.push(current.right);
//   }

//   return value;
// };

// // Itterable breadthFirst - tree includes
// const breadthTreeIncludes = (root, target) => {
//   if (root === null) return false;

//   const queue = [root];

//   while (queue.length > 0) {
//     const current = queue.shift();
//     if (current.val === target) return true;

//     current.left && queue.push(current.left);
//     current.right && queue.push(current.right);
//   }

//   return false;
// };

// // Recurrsive depth - tree includes
// const depthTreeIncludes = (root, target) => {
//   if (root === null) return false;
//   if (root.val === target) return true;

//   return (
//     depthTreeIncludes(root.left, target) ||
//     depthTreeIncludes(root.right, target)
//   );
// };

// // Recurrsive - tree sum
// const recurrsiveTreeSum = (root) => {
//   if (root === null) return 0;
//   return root.val + treeSum(root.left) + treeSum(root.right);
// };

// // Itterable - tree sum
// const itterableTreeSum = (root) => {
//   if (root === null) return 0;
//   const queue = [root];
//   let totalSum = 0;

//   while (queue.length > 0) {
//     const current = queue.shift();
//     totalSum += current.val;

//     current.left && queue.push(current.left);
//     current.right && queue.push(current.right);
//   }
//   return totalSum;
// };

// const treeMinValue = (root) => {
//   let smallest = Infinity;
//   const stack = [root];

//   while (stack.length > 0) {
//     const current = stack.pop();
//     if (current.val < smallest) smallest = current.val;

//     current.left && stack.push(current.left);
//     current.right && stack.push(current.right);
//   }
//   return smallest;
// };

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');
// const a = new Node(5);
// const b = new Node(12);
// const c = new Node(53);
// const d = new Node(623);
// const e = new Node(-23);
// const f = new Node(12);

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

// const output = depthFirstValues(a);
// const output = breadthFirstValues(a);
// const output = treeIncludes(a, 'f');
// const output = depthTreeIncludes(a, '2');
// const output = recurrsiveTreeSum(a);
// const output = itterableTreeSum(a);

// Itterable
const breadthFirstValues = (root, target, payload) => {
  if (root === null) return [];

  const value = [];
  const queue = [root];

  while (queue.length > 0) {
    // Remove node from the start
    const current = queue.shift();
    value.push(current.val);

    console.log();
    if (current === target) {
      current.left = payload;
    }

    // Add node to the end
    current.left && queue.push(current.left);
    current.right && queue.push(current.right);
  }

  return value;
};
const x = new Node('xxx');

const output = breadthFirstValues(a, f, x);
console.log(f);
console.log(output);
