import AddQuest from "./AddQuest";
import { useEffect, useState } from "react";
import AddedQuest from "./AddedQuest";
import { create, findAll, remove, update } from "./services/api";

function App() {
  const [quests, setQuest] = useState([]);

  async function addQuest(quest) {
    if (quest.trim() === "") {
      document.getElementById("my_modal_1").showModal();
    } else {
      const newQuest = await create(quest);
      console.log(newQuest);
      setQuest((prevQuests) => [...prevQuests, newQuest]);
    }
  }

  function addedQuest(quest, id) {
    update(id, quest);
    setQuest((prevQuests) => {
      const updatedQuests = [...prevQuests];
      updatedQuests[id] = quest;
      return updatedQuests;
    });
  }

  async function deleteQuest(id) {
    await remove(id);
    setQuest((prevQuests) => prevQuests.filter((q) => q.id !== id));
  }

  async function loadQuests() {
    setQuest(await findAll());
  }
  useEffect(() => {
    loadQuests();
  }, []);

  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Digita alguma coisa aí amigão, não pode ser vazio.
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="flex h-screen justify-center items-center">
        <div className="card w-[80%] lg:w-[50%] h-[70%] shadow-md rounded-sm items-center p-10 gap-5">
          <h1 className="text-5xl font-work font-bold w-fit text-center">
            Quests To Do
          </h1>
          <AddQuest addQuest={addQuest} />
          <div className="flex flex-col gap-2 w-full">
            {quests.map((q, index) => (
              <AddedQuest
                completed={q.completed}
                quest={q.title}
                deleteQuest={deleteQuest}
                index={q.id}
                addedQuest={addedQuest}
                key={q.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
