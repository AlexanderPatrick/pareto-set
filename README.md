# Pareto Set
_A function that filters an array down to the Pareto optimal set based on an array of objective functions_

## Installation
```bash
npm install pareto-set
```

## Usage
```javascript
const calculateParetoSet = require('pareto-set');

// The set to calculate the Pareto optimal set for.
const set = [
    {name: 'Task A', time:  1, energy:  8, reward: 8},
    {name: 'Task B', time:  4, energy: 10, reward: 2},
    {name: 'Task C', time: 10, energy:  6, reward: 1},
    {name: 'Task D', time: 10, energy:  3, reward: 6},
    {name: 'Task E', time:  5, energy:  7, reward: 1},
    {name: 'Task F', time:  6, energy:  3, reward: 1},
    {name: 'Task G', time:  7, energy: 10, reward: 6},
    {name: 'Task H', time:  9, energy:  4, reward: 3},
];

// The multiple objective functions to apply to the set.
// Each function takes two arguments which correspond to two objects from the set.
// If argument 1 is more optimal than argument 2 the function should return a negative number.
// If argument 2 is more optimal than argument 1 the function should return a positive number.
// If both arguments 1 and 2 are equally optimal the function should return zero.
const objectiveFunctions = [
    (task1, task2) => task1.time < task2.time ? -1 : task2.time < task1.time ? 1 : 0,
    (task1, task2) => task1.energy < task2.energy ? -1 : task2.energy < task1.energy ? 1 : 0,
    (task1, task2) => task1.reward > task2.reward ? -1 : task2.reward > task1.reward ? 1 : 0,
];

const paretoSet = calculateParetoSet(set, objectiveFunctions);
// Output:
// [ 
//     { name: 'Task A', time: 1, energy: 8, reward: 8 },
//     { name: 'Task D', time: 10, energy: 3, reward: 6 },
//     { name: 'Task E', time: 5, energy: 7, reward: 1 },
//     { name: 'Task F', time: 6, energy: 3, reward: 1 },
//     { name: 'Task H', time: 9, energy: 4, reward: 3 }
// ]
```