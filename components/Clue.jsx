function Clue({ clue, input, inputChars, removeChars, solved }) {
  return (
    <>
      <div className="clue-container">
        {clue.split("").map((char, i) => (
          <button
            className={`m-2 ${
              input.includes(i) === true
                ? "line-through"
                : "hover:text-green-300/100"
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
            input.length === 0 ? "" : "hover:text-red-300/100"
          }`}
          onClick={() => {
            removeChars();
          }}
          disabled={input.length === 0 ? true : false || solved}
        >
          x
        </button>
      </div>
    </>
  );
}

export default Clue;
