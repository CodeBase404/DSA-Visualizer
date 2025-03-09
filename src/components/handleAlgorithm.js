import { bubbleSortGenerator } from './SortingAlgorithms/bubbleSort.js';
import { selectionSortGenerator } from './SortingAlgorithms/selectionSort.js'
import { insertionSortGenerator } from './SortingAlgorithms/insertionSort.js'
import { mergeSortGenerator } from './SortingAlgorithms/mergeSort.js'
import { quickSortGenerator } from './SortingAlgorithms/quickSort.js'

const algorithmGenerator = {
    "Bubble Sort": bubbleSortGenerator,
    "Selection Sort": selectionSortGenerator,
    "Insertion Sort": insertionSortGenerator,
    "Merge Sort": mergeSortGenerator,
    "Quick Sort": quickSortGenerator,
}

const handleAlgorithm = {
    initializeSteps: (parsedArray, algorithm, setSteps, setCurrentStep, setIsPlaying) => {
        if (!algorithm) return;
        setSteps([]);
        setCurrentStep(0);
        setIsPlaying(false);

        let generator = algorithmGenerator[algorithm];
        if (!generator) return;

        const allSteps = [];
        const gen = generator([...parsedArray]);
        let result = gen.next();
        while (!result.done) {
            allSteps.push(result.value);
            result = gen.next();
        }
        setSteps(allSteps);
    },


    initializeRaceMode: (arr, algorithm, setRaceSteps, setRaceCurrentSteps, setIsPlaying) => {
        if (!algorithm || algorithm.length === 0) return;
        setIsPlaying(false);
        const raceSteps = {};
        const raceCurrentSteps = {};

        algorithm.forEach((algorithm) => {
            let generator = algorithmGenerator[algorithm];
            if (!generator) return;

            const allSteps = [];
            const gen = generator([...arr]);
            let result = gen.next();
            while (!result.done) {
                allSteps.push(result.value);
                result = gen.next();
            }
            raceSteps[algorithm] = allSteps;
            raceCurrentSteps[algorithm] = 0;
        });
        setRaceSteps(raceSteps);
        setRaceCurrentSteps(raceCurrentSteps);
    },


    handleInput: (input, setArr, algorithm, setSteps, setCurrentStep, setIsPlaying) => {
        const parsedArray = input.split(" ").map(Number).filter((n) => !isNaN(n));

        if (parsedArray.length > 0) {
            setArr(parsedArray);
            handleAlgorithm.initializeSteps(parsedArray, algorithm[0], setSteps, setCurrentStep, setIsPlaying);
        } else {
            alert("Please enter valid number separated by spaces like: 1 2 3");
        }
    },
};

export default handleAlgorithm;