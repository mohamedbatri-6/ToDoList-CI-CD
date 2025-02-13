"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newTask, description: newDescription })
    });

    if (res.ok) {
      fetchTasks();
      setNewTask("");
      setNewDescription("");
    }
  };

  const deleteTask = async (id) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    fetchTasks();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-500 p-6">
      <h1 className="text-3xl font-bold text-white mb-4">TO-DO LIST2</h1>
      
      {/* Section pour ajouter une nouvelle tâche */}
      <div className="flex flex-col mb-6 space-y-4 w-full max-w-md">
        <input
          type="text"
          className="border p-3 rounded-l-md text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Nom de la tâche..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          className="border p-3 rounded-l-md text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Description de la tâche..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={addTask} className="bg-green-600 text-white px-5 py-3 rounded-md hover:bg-green-700 transition">
          Ajouter
        </button>
      </div>

      {/* Liste des tâches */}
      <ul className="w-full max-w-md">
        {tasks.map((task) => (
          <li key={task.id} className="bg-white p-4 mb-4 flex justify-between items-center shadow-lg rounded-md">
            <div>
              <h3 className="font-semibold text-lg">{task.name}</h3>
              <p className="text-gray-600">{task.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
