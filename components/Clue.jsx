function Clue({ clue, input, inputChars, removeChars, solved }) {
  return (
    <>
      <div className="clue-container">
        {clue.split("").map((char, i) => (
          <button
            className={`m-2.5 w-6 rounded-md outline outline-offset-4 outline-white/50 ${
              input.includes(i) === true
                ? "text-white/50 line-through"
                : "hover:outline-green-300/50 hover:text-green-300/100"
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
            solved ? "text-white/50" : "hover:text-red-300/100"
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
