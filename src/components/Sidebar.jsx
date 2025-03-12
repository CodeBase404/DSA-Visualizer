import { motion } from "motion/react"
import { useState } from "react"

function Sidebar({ algorithm, setAlgorithm, raceMode, setRaceMode,setAlgorithmType}) {
    const [sortDropdown, setSortDropdown] = useState(false);
    const [searchDropdown, setSearchDropdown] = useState(false);

    const sortingAlgoList = [
        { name: "Bubble Sort", key: "Bubble Sort" },
        { name: "Selection Sort", key: "Selection Sort" },
        { name: "Insertion Sort", key: "Insertion Sort" },
        { name: "Merge Sort", key: "Merge Sort" },
        { name: "Quick Sort", key: "Quick Sort" },
    ];

    const searchingAlgoList = [
        { name: "Linear Search", key: "Linear Search" },
        { name: "Binary Search", key: "Binary Search" },
    ];

    const supportedAlgorithms = [
        "Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort","Linear Search","Binary Search"
    ];

    const handleAlgorithmSelection = (algokey) => {
        if (!supportedAlgorithms.includes(algokey)) {
            alert(`${algokey} is not yet implemented!`);
            return;
        }
        if (raceMode) {
            if (algorithm.includes(algokey)) {
                setAlgorithm(algorithm.filter((a) => a !== algokey));
            } else {
                setAlgorithm([...algorithm, algokey])
            }
        } else {
            setAlgorithm([algokey]);
        }
    };

    const isSelected = (algokey) => {
        return algorithm.includes(algokey);
    };

    return (
        <div className="flex flex-col gap-2 text-[8px] font-bold sm:text-[14px] text-center md:text-[14px]">
            <h1 className='text-sm md:text-3xl md:py-4 md:px-2 lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>Select Algorithms</h1>

            <button className="border p-2 w-[100%] bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow shadow-pink-900 rounded-md cursor-pointer" onClick={() =>{ setSortDropdown(!sortDropdown); setSearchDropdown(false); setAlgorithmType("sorting"); setAlgorithm([]);}}>
                Sorting Algorithms
            </button>

            <motion.ul
                initial={false}
                animate={{ height: sortDropdown ? "auto" : "0px", opacity: sortDropdown ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-5 rounded-md overflow-hidden"
            >
                {
                    sortingAlgoList.map((algo) => (
                        <motion.li
                            key={algo.key}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: sortDropdown ? 1 : 0, y: sortDropdown ? 0 : -10 }}
                            onClick={() => handleAlgorithmSelection(algo.key)}
                            className={`p-2 rounded-md text-gray-700 hover:bg-gray-900 hover:text-white cursor-pointer transition ${isSelected(algo.key) ? "bg-green-300 text-black! text-[.9rem] hover:bg-green-400" : ""} ${!supportedAlgorithms.includes(algo.key) ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {algo.name} {!supportedAlgorithms.includes(algo.key) && " Not Implemented"}
                        </motion.li>
                    ))}
            </motion.ul>



            <button className="border p-2 w-[100%] bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow shadow-pink-900 rounded-md cursor-pointer" onClick={() =>{ setSearchDropdown(!searchDropdown); setSortDropdown(false); setAlgorithmType("searching"); setAlgorithm([]); setRaceMode(false);}}>
                Searching Algorithms
            </button>

            <motion.ul
                initial={false}
                animate={{ height: searchDropdown ? "auto" : "0px", opacity: searchDropdown ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-5 rounded-md overflow-hidden"
            >
                {
                    searchingAlgoList.map((algo) => (
                        <motion.li
                            key={algo.key}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: searchDropdown ? 1 : 0, y: searchDropdown ? 0 : -10 }}
                            onClick={() => handleAlgorithmSelection(algo.key)}
                            className={` p-2 rounded-md  text-gray-700 hover:bg-gray-900 hover:text-white  cursor-pointer transition ${isSelected(algo.key) ? "bg-green-300 text-black! text-[.9rem] hover:bg-green-400" : "hover:bg-gray-100"} ${!supportedAlgorithms.includes(algo.key) ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {algo.name} {!supportedAlgorithms.includes(algo.key) && " Not Implemented"}
                        </motion.li>
                    ))}
            </motion.ul>

            <button className={`p-2 rounded-md cursor-pointer transition ${raceMode ? "text-white bg-gradient-to-tl from-rose-700 to-rose-950 hover:text-rose-300" : "text-white bg-gradient-to-tl from-green-700 to-green-950 hover:text-green-400"}`} onClick={() => setRaceMode(!raceMode)}>
                {raceMode ? "Disable Race Mode" : "Enable Race Mode"}
            </button>
        </div>
    )
}

export default Sidebar
