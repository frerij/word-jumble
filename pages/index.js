import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

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
    setInputs({ ...inputs, [key]: [...inputs[key], index] });
  }

  function removeChars(inputNum) {
    const key = "in" + inputNum;
    const popped = inputs[key].pop();
    setInputs({ ...inputs, [key]: [...inputs[key]] });
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
    const spaceArr = [];
    for (const char of data.Solution.s1) {
      if (char === "{") {
        spaceArr.push(" ");
      } else if (char === " " || char === "}") {
        continue;
      } else {
        spaceArr.push("_");
      }
    }
    setCaptionSpaces([...spaceArr]);
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
  }, [inputs.in1, inputs.in2, inputs.in3, inputs.in4]);

  return (
    <div>
      <Head>
        <title>Word Jumble</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="flex text-2xl ">Daily Word Jumble Game</h1>

        <p className="text-xl">
          {month}/{day}/{year} Puzzle
        </p>

        <div className="flex flex-col text-2xl items-center">
          <div className="clue-container">
            {data.Clues.c1.split("").map((char, i) => (
              <button
                className="hover:text-green-300/100 m-2"
                disabled={inputs.in1.includes(i)}
                onClick={() => {
                  inputChars(i, 1);
                }}
                key={"c1" + char + i}
              >
                {char}
              </button>
            ))}
          </div>
          <div className="input-container">
            {inputs.in1.map((index) => data.Clues.c1[index])}
            <button
              className="hover:text-red-300/100 m-2"
              onClick={() => {
                removeChars(1);
              }}
              disabled={inputs.in1.length === 0 ? true : false}
            >
              x
            </button>
          </div>
          <div className="clue-container">
            {data.Clues.c2.split("").map((char, i) => (
              <button
                className="hover:text-green-300/100 m-2"
                disabled={inputs.in2.includes(i)}
                onClick={() => {
                  inputChars(i, 2);
                }}
                key={"c2" + char + i}
              >
                {char}
              </button>
            ))}
          </div>
          <div className="input-container">
            {inputs.in2.map((index) => data.Clues.c2[index])}
            <button
              className="hover:text-red-300/100 m-2"
              onClick={() => {
                removeChars(2);
              }}
              disabled={inputs.in2.length === 0 ? true : false}
            >
              x
            </button>
          </div>
          <div className="clue-container">
            {data.Clues.c3.split("").map((char, i) => (
              <button
                className="hover:text-green-300/100 m-2"
                disabled={inputs.in3.includes(i)}
                onClick={() => {
                  inputChars(i, 3);
                }}
                key={"c3" + char + i}
              >
                {char}
              </button>
            ))}
          </div>
          <div className="input-container">
            {inputs.in3.map((index) => data.Clues.c3[index])}

            <button
              className="hover:text-red-300/100 m-2"
              onClick={() => {
                removeChars(3);
              }}
              disabled={inputs.in3.length === 0 ? true : false}
            >
              x
            </button>
          </div>
          <div className="clue-container">
            {data.Clues.c4.split("").map((char, i) => (
              <button
                className="hover:text-green-300/100 m-2"
                disabled={inputs.in4.includes(i)}
                onClick={() => {
                  inputChars(i, 4);
                }}
                key={"c4" + char + i}
              >
                {char}
              </button>
            ))}
          </div>
          <div className="input-container">
            {inputs.in4.map((index) => data.Clues.c4[index])}
            <button
              className="hover:text-red-300/100 m-2"
              onClick={() => {
                removeChars(4);
              }}
              disabled={inputs.in4.length === 0 ? true : false}
            >
              x
            </button>
          </div>

          <div className="mt-6">{data.Caption.v1}</div>
          <div className="m-2">
            {captionSpaces.map((char, i) => (
              <button key={i} className="m-2">
                {char}
              </button>
            ))}

            {inputs.in5.map((index) => bankLetters[index])}
            <button
              className="hover:text-red-300/100 m-2"
              onClick={() => {
                removeChars(5);
              }}
              disabled={inputs.in5.length === 0 ? true : false}
            >
              x
            </button>
          </div>
          <div className="mt-4">
            {bankLetters.map((char, i) => (
              <button
                key={char + i}
                className="hover:text-green-300/100 m-2"
                disabled={inputs.in5.includes(i)}
                onClick={() => {
                  inputChars(i, 5);
                }}
              >
                {char}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
