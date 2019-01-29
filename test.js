describe('Pareto Function', () => {
    const pareto = require('.');
    it('should return the ParetoOptimal Set of an array of objects', () => {
        const arrayToOptimise = [
            {param1: 80, param2: 44, param3: 33},
            {param1:  4, param2: 35, param3: 25},
            {param1: 33, param2: 64, param3: 73},
            {param1: 93, param2: 83, param3: 20},
            {param1: 62, param2: 44, param3: 84},
            {param1: 69, param2: 42, param3:  1},
            {param1: 90, param2: 87, param3: 70},
            {param1: 50, param2: 23, param3: 74},
        ];
        const objectiveFunctions = [
            (a,b) => b.param1-a.param1,
            (a,b) => b.param2-a.param2,
            (a,b) => b.param3-a.param3,
        ];
        const result = pareto(arrayToOptimise, objectiveFunctions);
        expect(result).toEqual([
            {param1: 33, param2: 64, param3: 73},
            {param1: 93, param2: 83, param3: 20},
            {param1: 62, param2: 44, param3: 84},
            {param1: 90, param2: 87, param3: 70},
        ]);
    });

    it('should work with an empty arrayToOptimise', () => {
        const arrayToOptimise = [];
        const objectiveFunctions = [];
        const result = pareto(arrayToOptimise, objectiveFunctions);
        expect(result).toEqual([]);
    });

    it('should return the full arrayToOptimise when an empty objectiveFunctions array is supplied', () => {
        const arrayToOptimise = [
            {param1: 80, param2: 44, param3: 33},
            {param1:  4, param2: 35, param3: 25},
            {param1: 33, param2: 64, param3: 73},
            {param1: 93, param2: 83, param3: 20},
        ];
        const objectiveFunctions = [];
        const result = pareto(arrayToOptimise, objectiveFunctions);
        expect(result).toEqual([
            {param1: 80, param2: 44, param3: 33},
            {param1:  4, param2: 35, param3: 25},
            {param1: 33, param2: 64, param3: 73},
            {param1: 93, param2: 83, param3: 20},
        ]);
    });
});