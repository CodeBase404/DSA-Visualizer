import { motion } from "motion/react";
import { useState } from "react";

function RenderBars({ arr, steps, currentStep,raceMode,algorithm }) {
  const current = steps[currentStep] || { array: arr, compare: [], swap: [], sorted: [] }
  const [viewMode, setViewMode] = useState("bars");

  const barWidth = 42;
  const barSpacing = 50;
  const boxSize = 60;
  const gap = 10;
  const baseHeight = 200 + arr.length * 10;
  const maxValue = arr.length > 0 ? Math.max(...arr) : 1;
  const scale = baseHeight / maxValue

  const getColor = (index, current) => {
    if (current.sorted.includes(index)) {
      return "#16e53c";
    }
    if (current.swap.includes(index)) {
      return "orange";
    }
    if (current.compare.includes(index)) {
      return "#ff1c1ce9";
    }
    return "steelblue";
  }

  return (
    <div className="relative flex flex-col justify-center items-center">
      <button className={`shadow mt-2 active:scale-90 shadow-gray-500 font-semibold text-green-700 hover:text-yellow-600 hover:shadow-gray-400 ${algorithm.length>=2?" md:mt-1 absolute top-[-30px] right-0 md:top-0 md:relative py-1 mt-1 md:px-4 md:py-2 px-2 text-[10px]":"px-4 py-2"}  rounded-2xl cursor-pointer`} onClick={() => setViewMode(viewMode === "bars" ? 'box' : 'bars')}>{viewMode==='bars'?'Box':'Bars'}</button>
      <svg className={`p-2 w-full ${algorithm.length==2?"flex-row h-[20vh]":"flex-col"} ${raceMode && algorithm.length==3?"h-[15vh]  md:h-[50vh] lg:h-[60vh] ":"h-[33vh] md:h-[55vh] lg:h-[60vh]"} `}
        viewBox={`0 0 ${(arr.length * (viewMode === "bars" ? barSpacing : (boxSize + gap)))} ${baseHeight + 50}`}
      >
        {
          current.array.map((value, index) => (
            <g key={index}>
              {viewMode === "bars" ? (
                <motion.rect
                  x={index * barSpacing}
                  y={baseHeight - value * scale}
                  width={barWidth}
                  rx={5} ry={5}
                  height={value * scale}
                  fill={getColor(index, current)}
                  transition={{ duration: 0.3, ease: 'linear' }}
                />
              ) : (
                <motion.rect
                  x={index * (boxSize + gap)}
                  y={130}
                  width={boxSize}
                  height={boxSize}
                  rx={10} ry={10}
                  fill={getColor(index, current)}
                  transition={{ duration: 0.3, ease: 'linear' }}
                />
              )}
              <text
                x={index * (viewMode === "bars" ? barSpacing : (boxSize + gap)) + (viewMode === "bars" ? barWidth / 2 : boxSize / 2)}
                y={viewMode === "bars" ? baseHeight - 4 : 170}
                textAnchor="middle"
                fill="yellow"
                fontWeight='bold'
                fontSize={25}
              >
                {value}
              </text>
              <text
                x={index * (viewMode === "bars" ? barSpacing : (boxSize + gap)) + (viewMode === "bars" ? barWidth / 2 : boxSize / 2)}
                y={viewMode === "bars" ? baseHeight + 25 : boxSize + 160}
                textAnchor="middle"
                fill="white"
                fontWeight='bold'
                fontSize={20}
              >
                {index}
              </text>

            </g>
          ))
        }
      </svg>
      <ul className="absolute bottom-2 text-white flex justify-center gap-2 text-[4px] sm:left-5 sm:text-[9px] left-3 lg:left-5 lg:gap-10 md:text-[9px]">
        <li>🔴 Compared</li>
        <li>🟠 Swapped</li>
        <li>🟢 Sorted</li>
      </ul>
    </div>
  )
}

export default RenderBars;