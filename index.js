const {
    isOptimal,
} = require('./functions');

module.exports = (arrayToOptimise, objectiveFunctions) => {
    const sortedArray = [].concat(arrayToOptimise).sort(objectiveFunctions[0]);
    let paretoArray = [];
    sortedArray.forEach(item => {
        if (paretoArray.length === 0) {
            paretoArray.push(item);
            return;
        }

        const optimal = isOptimal(item, paretoArray, objectiveFunctions);

        if (optimal === true) {
            paretoArray.push(item);
        }
    });

    const initialOptimal = isOptimal(paretoArray[0], paretoArray, objectiveFunctions);
    if (!initialOptimal) {
        paretoArray = paretoArray.filter((item, index) => index > 0);
    }

    return arrayToOptimise.filter(item => paretoArray.includes(item));
}
