exports.isOptimal = (item, paretoArray, objectiveFunctions) => {
    return paretoArray.reduce((optimal, paretoOptimalItem) => {
        const evaluation = objectiveFunctions.reduce((evaluation, objectiveFunction) => {
            // TODO: In a new feature branch create meta array of which objective functions contributed to a pareto optimal item being chosen
            // Will need to nix this early exit.
            if (evaluation.best < 0 && evaluation.worst > 0) {
                return evaluation;
            }

            const sortValue = objectiveFunction(item, paretoOptimalItem);
            const normalisedSortValue = sortValue < 0 ? -1 : sortValue > 0 ? 1 : 0;
            if (evaluation.best === undefined || normalisedSortValue < evaluation.best) {
                evaluation.best = normalisedSortValue;
                evaluation.bestObjectives = [objectiveFunction.name];
            }

            if (evaluation.worst === undefined || normalisedSortValue > evaluation.worst) {
                evaluation.worst = normalisedSortValue;
            } 

            return evaluation;
        }, {});

        if (evaluation.best > 0 || (evaluation.best === 0 && evaluation.worst > 0)) {
            optimal = false;
        }
        return optimal;
    }, true);
}