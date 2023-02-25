import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Clue from "../components/Clue";
import PopUp from "../components/PopUp";

export default function Home() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  // for debugging sunday puzzles: const dateString = year + "-" + 1 + "-" + 29;
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
    in6: [],
    in7: [],
  });
  const [bankLetters, setBankLetters] = useState([]);
  // change to just i
  const [checked, setChecked] = useState({
    word1: false,
    word2: false,
    word3: false,
    word4: false,
    word5: false,
    word6: false,
    caption: false,
  });
  const [solved, setSolved] = useState({});
  const [captionSpaces, setCaptionSpaces] = useState([]);
  const [clueArray, setClueArray] = useState([]);

  async function getData() {
    try {
      // for past date debugging: let url = `https://gamedata.services.amuniversal.com/c/uupuz/l/U2FsdGVkX1+b5Y+X7zaEFHSWJrCGS0ZTfgh8ArjtJXrQId7t4Y1oVKwUDKd4WyEo%0A/g/tmjmf/d/${dateString}/data.json`;
      let url = `https://gamedata.services.amuniversal.com/c/uupuz/l/U2FsdGVkX1+b5Y+X7zaEFHSWJrCGS0ZTfgh8ArjtJXrQId7t4Y1oVKwUDKd4WyEo%0A/g/tmjmf/d/${dateString}/data.json`;

      if (date.getDay() === 0) {
        url = `https://gamedata.services.amuniversal.com/c/uupuz/l/U2FsdGVkX1+b5Y+X7zaEFHSWJrCGS0ZTfgh8ArjtJXrQId7t4Y1oVKwUDKd4WyEo%0A/g/tmjms/d/${dateString}/data.json`;
      }
      const response = await fetch(url);
      const fetchedData = await response.json();
      setData(fetchedData);
      setChecked({
        caption: false,
      });
      setBankLetters([]);
    } catch (e) {
      console.error("error", e);
    }
  }

  function makeClueArray() {
    if (data.Clues.c5) {
      setClueArray([
        {
          clue: data.Clues.c1,
          answer: data.Clues.a1,
          captionIndices: data.Clues.o1,
        },
        {
          clue: data.Clues.c2,
          answer: data.Clues.a2,
          captionIndices: data.Clues.o2,
        },
        {
          clue: data.Clues.c3,
          answer: data.Clues.a3,
          captionIndices: data.Clues.o3,
        },
        {
          clue: data.Clues.c4,
          answer: data.Clues.a4,
          captionIndices: data.Clues.o4,
        },
        {
          clue: data.Clues.c5,
          answer: data.Clues.a5,
          captionIndices: data.Clues.o5,
        },
        {
          clue: data.Clues.c6,
          answer: data.Clues.a6,
          captionIndices: data.Clues.o6,
        },
      ]);
    } else {
      setClueArray([
        {
          clue: data.Clues.c1,
          answer: data.Clues.a1,
          captionIndices: data.Clues.o1,
        },
        {
          clue: data.Clues.c2,
          answer: data.Clues.a2,
          captionIndices: data.Clues.o2,
        },
        {
          clue: data.Clues.c3,
          answer: data.Clues.a3,
          captionIndices: data.Clues.o3,
        },
        {
          clue: data.Clues.c4,
          answer: data.Clues.a4,
          captionIndices: data.Clues.o4,
        },
      ]);
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
    console.log(inputs[key][i]);

    if (i === -1) {
      i = inputs[key].length - 1;
    } else {
      i = i - 1;
    }
    if (inputs[key][i] === " ") {
      i -= 1;
    }

    newInputs[key][i] = "_";

    setInputs(newInputs);
  }

  function capSpaces() {
    const answers = [data.Solution.s1];

    const newInputs = {
      in7: [],
    };
    let count = 1;

    for (let ans of answers) {
      const spaceArr = [];
      for (let char of ans) {
        if (char === "{") {
          spaceArr.push(" ");
        } else if (char === " " || char === "}") {
          continue;
        } else if (char === '"' || char === `'` || char === "-") {
          spaceArr.push(char);
        } else {
          spaceArr.push("_");
        }
      }
      newInputs["in" + "7"] = spaceArr;
      count += 1;
    }
    setInputs(newInputs);
  }

  function checkCaption(caption) {
    let condensedCaption = "";
    for (let index of caption) {
      if (Number.isInteger(index)) {
        condensedCaption += bankLetters[index];
      } else {
        continue;
      }
    }
    console.log(condensedCaption);
    if (condensedCaption === data.Solution.k1) {
      setChecked({ ...checked, caption: true });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    makeClueArray();
    capSpaces();
  }, [data]);

  makeClues();
  console.log(inputs.in7);
  useEffect(() => {
    checkCaption(inputs.in7);
  }, [inputs]);

  console.log(bankLetters);

  return (
    <div className="bg-stone-200 dark:bg-sky-900 font-mono min-w-fit min-h-screen">
      <Head>
        <title>Word Jumble</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-stone-800 dark:text-stone-200">
        <h1 className="ml-2 flex text-2xl ">Daily Word Jumble</h1>

        <p className="ml-2 text-xl">
          {month}/{day}/{year}
        </p>

        <PopUp />

        <div className="flex flex-col text-2xl items-center">
          {clueArray.map((clue, i) => {
            return (
              <Clue
                key={"clue" + (i + 1)}
                clue={clue.clue}
                answer={clue.answer}
                captionIndices={clue.captionIndices}
                onComplete={(letters) => {
                  setSolved({ ...solved, [i]: true });
                  setBankLetters([...bankLetters, ...letters]);
                }}
              />
            );
          })}

          <br />
          <div className="mt-6">{data.Caption.v1}</div>
          <div className="m-2">
            {inputs.in7.map((index, i) => (
              <button key={i} className="m-2" disabled={true}>
                {index === "_" ? "_" : bankLetters[index]}
              </button>
            ))}

            <button
              className={`m-2 ${
                inputs.in7.length === 0 || checked["caption"]
                  ? "text-stone-800/50 dark:text-stone-200/50"
                  : "hover:text-red-300/100"
              }`}
              onClick={() => {
                removeChars(7);
              }}
              disabled={
                inputs.in7.length === 0 ? true : false || checked["caption"]
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
                  inputs.in7.includes(i) === true
                    ? "text-stone-800/50 dark:text-stone-200/50 line-through"
                    : "hover:outline-cyan-600/50 hover:text-cyan-600 dark:hover:outline-green-300/50 dark:hover:text-emerald-300/100"
                }`}
                disabled={inputs.in7.includes(i)}
                onClick={() => {
                  inputChars(i, 7);
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
