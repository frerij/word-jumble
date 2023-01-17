import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Clue from "../components/Clue";

export default function Home() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dateString = year + "-" + month + "-" + day;
  const [data, setData] = useState({
    Clues: {
      c1: "",
      c2: "",
      c3: "",
      c4: "",
      a1: "",
      a2: "",
      a3: "",
      a4: "",
      o1: "",
      o2: "",
      o3: "",
      o4: "",
    },
    Caption: {},
    Solution: { s1: "", k1: "" },
  });
  const [inputs, setInputs] = useState({
    in1: [],
    in2: [],
    in3: [],
    in4: [],
    in5: [],
  });
  const [bankLetters, setBankLetters] = useState([]);
  const [checked, setChecked] = useState({
    word1: false,
    word2: false,
    word3: false,
    word4: false,
  });
  const [captionSpaces, setCaptionSpaces] = useState([]);

  async function getData() {
    try {
      let url = `https://gamedata.services.amuniversal.com/c/uupuz/l/U2FsdGVkX1+b5Y+X7zaEFHSWJrCGS0ZTfgh8ArjtJXrQId7t4Y1oVKwUDKd4WyEo%0A/g/tmjmf/d/${dateString}/data.json`;
      if (date.getDay() === 0) {
        url = `https://gamedata.services.amuniversal.com/c/uupuz/l/U2FsdGVkX1+b5Y+X7zaEFHSWJrCGS0ZTfgh8ArjtJXrQId7t4Y1oVKwUDKd4WyEo%0A/g/tmjms/d/${dateString}/data.json`;
      }
      const response = await fetch(url);
      const fetchedData = await response.json();
      setData(fetchedData);
      setChecked({ word1: false, word2: false, word3: false, word4: false });
      setBankLetters([]);
    } catch (e) {
      console.error("error", e);
    }
  }

  function makeClues() {
    const clues = Object.entries(data.Clues);

    for (const [key, value] of clues) {
      if (key.includes("c")) {
      }
    }
  }

  function inputChars(index, inputNum) {
    const key = "in" + inputNum;
    const newInputs = { ...inputs };
    let i = inputs[key].indexOf("_");
    newInputs[key][i] = index;

    setInputs(newInputs);
  }

  function removeChars(inputNum) {
    const key = "in" + inputNum;
    const newInputs = { ...inputs };
    let i = inputs[key].indexOf("_");
    if (i === -1) {
      i = inputs[key].length - 1;
    } else {
      i = i - 1;
    }

    newInputs[key][i] = "_";

    setInputs(newInputs);
  }

  function checkInput(inputNum) {
    const solKey = "a" + inputNum;
    const bankKey = "o" + inputNum;
    const inString = inputs["in" + inputNum]
      .map((index) => data.Clues["c" + inputNum][index])
      .join("");

    if (
      inString === data.Clues[solKey] &&
      checked["word" + inputNum] === false
    ) {
      const bankIndices = data.Clues[bankKey]
        .split(",")
        .map((x) => x - 1)
        .filter((item) => item !== undefined);

      for (let num in bankIndices) {
        setBankLetters((bankLetters) => [
          ...bankLetters,
          inString[bankIndices[num]],
        ]);
      }
      setChecked({ ...checked, ["word" + inputNum]: true });
    }
  }

  function capSpaces() {
    const answers = [
      data.Clues.a1,
      data.Clues.a2,
      data.Clues.a3,
      data.Clues.a4,
      data.Solution.s1,
    ];

    const newInputs = { in1: [], in2: [], in3: [], in4: [], in5: [] };
    let count = 1;

    for (let ans of answers) {
      const spaceArr = [];
      for (let char of ans) {
        if (char === "{") {
          spaceArr.push(" ");
        } else if (char === " " || char === "}") {
          continue;
          // } else if (char === '"' || char === `'`) {
          //   spaceArr.push(char);
        } else {
          spaceArr.push("_");
        }
      }
      newInputs["in" + count] = spaceArr;
      count += 1;
    }
    setInputs(newInputs);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    capSpaces();
  }, [data]);

  makeClues();

  useEffect(() => {
    checkInput(1);
    checkInput(2);
    checkInput(3);
    checkInput(4);
  }, [inputs]);

  return (
    <div className="bg-stone-200 dark:bg-sky-900 font-mono min-w-fit min-h-screen">
      <Head>
        <title>Word Jumble</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-stone-800 dark:text-stone-200">
        <h1 className="ml-2 flex text-2xl ">Daily Word Jumble Game</h1>

        <p className="ml-2 text-xl">
          {month}/{day}/{year}
        </p>

        <div className="flex flex-col text-2xl items-center">
          <Clue
            clue={data.Clues.c1}
            input={inputs.in1}
            inputChars={(i) => inputChars(i, 1)}
            removeChars={() => removeChars(1)}
            solved={checked["word" + 1]}
          />
          <br />
          <Clue
            clue={data.Clues.c2}
            input={inputs.in2}
            inputChars={(i) => inputChars(i, 2)}
            removeChars={() => removeChars(2)}
            solved={checked["word" + 2]}
          />
          <br />
          <Clue
            clue={data.Clues.c3}
            input={inputs.in3}
            inputChars={(i) => inputChars(i, 3)}
            removeChars={() => removeChars(3)}
            solved={checked["word" + 3]}
          />
          <br />
          <Clue
            clue={data.Clues.c4}
            input={inputs.in4}
            inputChars={(i) => inputChars(i, 4)}
            removeChars={() => removeChars(4)}
            solved={checked["word" + 4]}
          />

          <br />
          <div className="mt-6">{data.Caption.v1}</div>
          <div className="m-2">
            {inputs.in5.map((index, i) => (
              <button key={i} className="m-2" disabled={true}>
                {index === "_" ? "_" : bankLetters[index]}
              </button>
            ))}

            <button
              className={`m-2 ${
                inputs.in5.length === 0
                  ? "text-stone-800/50 dark:text-stone-200/50"
                  : "hover:text-red-300/100"
              }`}
              onClick={() => {
                removeChars(5);
              }}
              disabled={
                inputs.in5.length === 0
                  ? true
                  : false || checked["word" + 5] === true
              }
            >
              x
            </button>
          </div>
          <div className="mt-4">
            {bankLetters.map((char, i) => (
              <button
                key={char + i}
                className={`m-2.5 w-6 rounded-md outline outline-offset-4 outline-stone-800/50 dark:text-stone-200 dark:outline-stone-200/50 ${
                  inputs.in5.includes(i) === true
                    ? "text-stone-800/50 dark:text-stone-200/50 line-through"
                    : "hover:outline-cyan-600/50 hover:text-cyan-600 dark:hover:outline-green-300/50 dark:hover:text-emerald-300/100"
                }`}
                disabled={inputs.in5.includes(i)}
                onClick={() => {
                  inputChars(i, 5);
                }}
              >
                {char}
              </button>
            ))}
          </div>
          <br />
          <div className="w-72 h-96 relative">
            <Image
              src={data.Image}
              alt="daily jumble caption comic"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
