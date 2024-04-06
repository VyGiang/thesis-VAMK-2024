import React, { useState, useEffect } from "react"
import { Task } from "../models/Task"
import TodoItem from "./TodoItem"
import { FaEdit } from "react-icons/fa"

function saveTasks(tasks: Task[]) {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJson = localStorage.getItem("tasks")
  if (taskJson == null) return []
  return JSON.parse(taskJson)
}
const TodoList: React.FC<{ onOpenPopup: () => void }> = ({ onOpenPopup }) => {
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
        {/* main*/}
        <div className="  bg-white sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl p-5  dark:bg-[#414244]">
          <div className="flex items-center justify-center space-x-4">
            <h1 className="text-4xl font-bold text-center flex items-center">
              TODO LIST
            </h1>
            <button
              onClick={onOpenPopup}
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <FaEdit className="w-6 h-6 md:w-8 md:h-8 lg:w-8 lg:h-8" />
            </button>
          </div>

          <div className="bg-blue-100 w-full max-w-4xl mx-auto rounded-lg shadow-md p-6 dark:bg-[#2e537a]">
            <div className="flex justify-between mb-6">
              <div className="w-full max-w-3xl mx-auto">
                {/* Input field and add button */}
                <div className="flex space-x-4 mb-6">
                  <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter a new task"
                    className="form-input mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:bg-[#1d1d1f] dark:text-white"
                    style={{ maxWidth: "85%" }}
                  />
                  <button
                    onClick={addTask}
                    className="bg-orange-400 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Task
                  </button>
                </div>
                {/* Container for tasks */}
                <div className="space-y-4 ">
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
