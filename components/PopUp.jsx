import React from "react";
import Popup from "reactjs-popup";

function PopupHowTo() {
  return (
    <div className="ml-2">
      <Popup
        trigger={
          <button className="mt-2 rounded-md outline outline-offset-2 outline-stone-800/50 hover:text-sky-900 hover:outline-sky-900/50 dark:hover:text-green-300 dark:hover:outline-green-300/50 dark:text-stone-200 dark:outline-stone-200/50">
            How to play
          </button>
        }
        position="right center"
      >
        <div className="font-mono m-2">
          <br />
          Unscramble the words to reveal which letters <br />
          you will have to complete the caption
        </div>
      </Popup>
    </div>
  );
}

export default PopupHowTo;
