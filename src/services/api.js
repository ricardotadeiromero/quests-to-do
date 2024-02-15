import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

export async function findAll() {
  const quests = await api.get("/todo");
  console.log(quests.data);
  return quests.data;
}

export async function create(title) {
  const newQuest = await api.post("/todo", { title: title });
  return newQuest.data;
}

export async function update(id, title) {
  return await api.put("/todo", { id: id, title: title });
}

export async function remove(id) {
  return await api.delete(`/todo/`, { data: { id: id } });
}

export async function completedF(id) {
  console.log(id);
  return await api.put(`/todo/completed/${id}`);
}
export async function notCompleted(id) {
  console.log(id);
  return await api.put(`/todo/not-completed/${id}`);
}
