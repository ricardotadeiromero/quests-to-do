import React from "react";
import { useState } from "react";

export default function AddQuest(props) {
  const [value, setValue] = useState("");

  return (
    <div className="flex gap-4 w-full justify-center items-center">
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="quest"
        className="input pl-2 flex w-[70%] focus:outline-none"
      ></input>
      <button
        onClick={() => props.addQuest(value)}
        className="flex items-center text-center rounded-full h-fit px-2
      text-lg btn btn-outline btn-sm"
      >
        +
      </button>
    </div>
  );
}
