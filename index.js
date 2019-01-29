module.exports = (arrayToOptimise, objectiveFunctions) => {
    const sortedArray = [].concat(arrayToOptimise).sort(objectiveFunctions[0]);
    const paretoArray = [];
    sortedArray.forEach(item => {
        if (paretoArray.length === 0) {
            paretoArray.push(item);
            return;
        }

        const optimal = paretoArray.reduce((optimal, paretoOptimalItem) => {
            const best = objectiveFunctions.reduce((best, optimisingFunction) => {
                if (best < 0) {
                    return -1;
                } 

                const sortValue = optimisingFunction(item, paretoOptimalItem);
                if (best === undefined || best > sortValue) {
                    best = sortValue;
                } 

                return best;
            }, undefined);

            if (best > 0) {
                optimal = false;
            }
            return optimal;
        }, true);

        if (optimal === true) {
            paretoArray.push(item);
        }
    });

    return arrayToOptimise.filter(item => paretoArray.includes(item));
}
