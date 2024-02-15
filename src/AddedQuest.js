import React, { useEffect, useState } from "react";
import { notCompleted, completedF, update } from "./services/api";

export default function AddedQuest({
  completed,
  quest,
  addedQuest,
  deleteQuest,
  index,
}) {
  const [enabled, setEnabled] = useState(false);
  const [checked, setChecked] = useState(completed === 1);
  const [value, setValue] = useState(quest);

  const toggleEdit = () => setEnabled(!enabled);

  const handleChange = (e) => setValue(e.target.value);

  const handleEdit = () => {
    setEnabled(false);
    update(index, value);
  };

  const handleCheck = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) completedF(index);
    if (!e.target.checked) notCompleted(index);
    console.log(e.target.checked);
  };
  return (
    <div className="flex gap-4 w-full justify-center items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheck}
        className="checkbox"
      ></input>
      <input
        type="text"
        onChange={handleChange}
        value={value}
        placeholder="Quest"
        disabled={!enabled}
        className="input pl-2 flex w-[70%] focus:outline-none"
      />
      {enabled ? (
        <button onClick={handleEdit} className="btn btn-sm btn-outline">
          Alterar
        </button>
      ) : (
        <>
          <button onClick={toggleEdit} className="btn btn-sm btn-outline">
            Edit
          </button>
          <button
            onClick={() => deleteQuest(index)}
            className="btn btn-sm btn-outline"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
