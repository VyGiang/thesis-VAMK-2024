import React, { useState, useEffect } from "react"
import { Task } from "../models/Task"
import TodoItem from "./TodoItem"
import Navbar from "./Navbar"

function saveTasks(tasks: Task[]) {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJson = localStorage.getItem("tasks")
  if (taskJson == null) return []
  return JSON.parse(taskJson)
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasks()) // Initial state is loaded from Local Storage
  const [newTaskText, setNewTaskText] = useState("")

  // Effect for saving tasks to Local Storage when 'tasks' changes
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = () => {
    if (!newTaskText.trim()) return // Prevent adding empty tasks
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
      updatedAt: new Date().toISOString(), // Save the current date and time
    }
    setTasks((prevTasks) => [newTask, ...prevTasks])
    setNewTaskText("") // Clear the input after adding a task
  }

  // Handle "Enter" key in the input field to add a task
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      addTask()
    }
  }

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }
  const editTask = (id: number, newText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, text: newText, updatedAt: new Date().toISOString() }
          : task
      )
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end">
          <p className="text-right text-sm font-bold">
            Monday, 11 December 2023
          </p>
        </div>

        {/* main*/}
        <div className="  bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl p-5">
          <h1 className="text-4xl font-bold mb-3 text-center">TODO LIST</h1>
          <div className="bg-blue-100 w-full max-w-4xl mx-auto rounded-lg shadow-md p-6">
            <div className="flex justify-between mb-6">
              <div className=" w-full max-w-3xl mx-auto">
                <div className="flex space-x-4 mb-6">
                  <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter a new task"
                    className="form-input mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
                    style={{ maxWidth: "85%" }}
                  />
                  <button
                    onClick={addTask}
                    className="bg-orange-400 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Task
                  </button>
                </div>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <TodoItem
                      key={task.id}
                      task={task}
                      deleteTask={deleteTask}
                      toggleTask={toggleTask}
                      editTask={editTask}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoList
