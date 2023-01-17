function Clue({ clue, input, inputChars, removeChars, solved }) {
  return (
    <>
      <div className="clue-container">
        {clue.split("").map((char, i) => (
          <button
            className={`m-2.5 w-6 rounded-md outline outline-offset-4 outline-stone-800/50 dark:text-stone-200 dark:outline-stone-200/50 ${
              input.includes(i) === true
                ? "text-stone-800/50 dark:text-stone-200/50 line-through"
                : "hover:outline-cyan-600/50 hover:text-cyan-600 dark:hover:outline-green-300/50 dark:hover:text-emerald-300/100"
            }`}
            disabled={input.includes(i)}
            onClick={() => {
              inputChars(i);
            }}
            key={"c1" + char + i}
          >
            {char}
          </button>
        ))}
      </div>
      <div className="input-container">
        {input.map((index, i) => (
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
    </>
  );
}

export default Clue;
