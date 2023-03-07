import { useState, useEffect } from "react";

function Clue({ onComplete, clue, answer, captionIndices }) {
  const [input, setInput] = useState([]);
  const [solved, setSolved] = useState(false);
  const [inputArray, setInputArray] = useState([]);

  let letters = captionIndices.split(",").map((i) => answer[i - 1]);

  function makeinputArray() {
    let tempInputArr = [];

    for (let char of answer) {
      if (char === "{") {
        tempInputArr.push(" ");
      } else if (char === " " || char === "}") {
        continue;
      } else if (char === '"' || char === `'` || char === "-") {
        tempInputArr.push(char);
      } else {
        tempInputArr.push("_");
      }
    }

    setInputArray(tempInputArr);
  }

  function inputChars(index) {
    const newInput = [...inputArray];
    let i = newInput.indexOf("_");
    newInput[i] = index;

    setInputArray(newInput);
  }

  function removeChars() {
    const newInput = [...inputArray];
    let i = inputArray.indexOf("_");
    if (i === -1) {
      i = inputArray.length - 1;
    } else {
      i = i - 1;
    }

    newInput[i] = "_";

    setInputArray(newInput);
  }

  function checkInput() {
    const inputString = inputArray.map((index) => clue[index]).join("");

    if (inputString === answer) {
      setSolved(true);
      onComplete(letters);
    } else {
      setSolved(false);
    }
  }

  useEffect(() => {
    makeinputArray();
  }, [answer]);

  useEffect(() => {
    checkInput();
  }, [inputArray]);

  return (
    <>
      <div className="clue-container">
        {clue.split("").map((char, i) => (
          <button
            className={`m-2.5 w-6 rounded-md outline outline-offset-4 outline-stone-800/50 dark:text-stone-200 dark:outline-stone-200/50 ${
              inputArray.includes(i) === true
                ? "text-stone-800/50 dark:text-stone-200/50 line-through"
                : "hover:outline-cyan-600/50 hover:text-cyan-600 dark:hover:outline-emerald-300 dark:hover:text-emerald-300/100"
            }`}
            disabled={inputArray.includes(i)}
            onClick={() => {
              inputChars(i);
            }}
            key={answer + i}
          >
            {char}
          </button>
        ))}
      </div>
      <div className="input-container">
        {inputArray.map((index, i) => (
          <button key={i} className="m-2" disabled={true}>
            {index === "_" ? "_" : clue[index]}
          </button>
        ))}
        <button
          className={`m-2 ${
            solved
              ? "text-stone-800/50 dark:text-stone-200/50"
              : "hover:text-red-300/100"
          }`}
          onClick={() => {
            removeChars();
          }}
          disabled={solved}
        >
          x
        </button>
      </div>
      <br />
    </>
  );
}

export default Clue;
