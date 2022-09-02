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
    Clues: { c1: "", c2: "", c3: "", c4: "" },
    Caption: {},
  });
  const [inputs, setInputs] = useState({
    in1: [],
    in2: [],
    in3: [],
    in4: [],
  });

  async function getData() {
    try {
      let url = `https://gamedata.services.amuniversal.com/c/uupuz/l/U2FsdGVkX1+b5Y+X7zaEFHSWJrCGS0ZTfgh8ArjtJXrQId7t4Y1oVKwUDKd4WyEo%0A/g/tmjmf/d/${dateString}/data.json`;
      if (date.getDay() === 0) {
        url = `https://gamedata.services.amuniversal.com/c/uupuz/l/U2FsdGVkX1+b5Y+X7zaEFHSWJrCGS0ZTfgh8ArjtJXrQId7t4Y1oVKwUDKd4WyEo%0A/g/tmjms/d/${dateString}/data.json`;
      }
      const response = await fetch(url);
      const fetchedData = await response.json();
      setData(fetchedData);
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

  function inputChars(char, inputNum) {
    const key = "in" + inputNum;
    setInputs({ ...inputs, [key]: [...inputs[key], char] });
    console.log(char);
  }

  useEffect(() => {
    getData();
  }, []);

  makeClues();
  console.log(inputs);

  return (
    <div>
      <Head>
        <title>Word Jumble</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="flex text-2xl">Daily Word Jumble Game</h1>

        <p className="text-xl">
          {month}/{day}/{year} Puzzle
        </p>

        <div className="flex flex-col text-2xl ">
          <div className="">
            {data.Clues.c1.split("").map((char, i) => (
              <button
                className="hover:text-green-300/100 m-2"
                onClick={() => {
                  inputChars(char, 1);
                }}
                key={"c1" + char + i}
              >
                {char}
              </button>
            ))}
          </div>
          <div>{inputs.in1}</div>
          <div>
            {data.Clues.c2.split("").map((char, i) => (
              <button
                className="hover:text-green-300/100 m-2"
                onClick={() => {
                  inputChars(char, 2);
                }}
                key={"c2" + char + i}
              >
                {char}
              </button>
            ))}
          </div>
          <div>{inputs.in2}</div>
          <div>
            {data.Clues.c3.split("").map((char, i) => (
              <button
                className="hover:text-green-300/100 m-2"
                onClick={() => {
                  inputChars(char, 3);
                }}
                key={"c3" + char + i}
              >
                {char}
              </button>
            ))}
          </div>
          <div>{inputs.in3}</div>
          <div>
            {data.Clues.c4.split("").map((char, i) => (
              <button
                className="hover:text-green-300/100 m-2"
                onClick={() => {
                  inputChars(char, 4);
                }}
                key={"c4" + char + i}
              >
                {char}
              </button>
            ))}
          </div>
          <div>{inputs.in4}</div>

          <div>{data.Caption.v1}</div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
