module.exports = (arrayToOptimise, objectiveFunctions) => {
    const sortedArray = [].concat(arrayToOptimise).sort(objectiveFunctions[0]);
    const paretoArray = [];
    sortedArray.forEach(item => {
        if (paretoArray.length === 0) {
            paretoArray.push(item);
            return;
        }

        const optimal = paretoArray.reduce((optimal, paretoOptimalItem) => {
            const evaluation = objectiveFunctions.reduce((evaluation, optimisingFunction) => {
                if (evaluation.best < 0 && evaluation.worst > 0) {
                    return evaluation;
                }

                const sortValue = optimisingFunction(item, paretoOptimalItem);
                if (evaluation.best === undefined || sortValue < evaluation.best) {
                    evaluation.best = sortValue;
                } 
                if (evaluation.worst === undefined || sortValue > evaluation.worst) {
                    evaluation.worst = sortValue;
                } 

                return evaluation;
            }, {best: undefined, worst: undefined});

            if (evaluation.best > 0 || (evaluation.best === 0 && evaluation.worst > 0)) {
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
