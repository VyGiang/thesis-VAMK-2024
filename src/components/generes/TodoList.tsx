import React, { useState, useEffect } from "react"
import TodoItem from "./TodoItem"
import { FaEdit } from "react-icons/fa"
import { auth, db } from "@/firebase"
import {
  getAllTasksFromFirestore,
  addTaskToFirestore,
  deleteTaskFromFirestore,
  updateTaskInFirestore,
} from "@/lib/FirebaseCollection"
import { Task } from "@/lib/DataInterfaces"

const TodoList: React.FC<{ onOpenPopup: () => void }> = ({ onOpenPopup }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskText, setNewTaskText] = useState("")

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = auth.currentUser?.uid
      if (userId) {
        const fetchedTasks = await getAllTasksFromFirestore(userId)
        setTasks(fetchedTasks)
      }
    }
    console.log(tasks)

    fetchTasks()
  }, [])

  const addTask = async () => {
    const userId = auth.currentUser?.uid
    if (!newTaskText.trim() || !userId) return // Prevent adding empty tasks or if no user is logged in

    const newTask: Task = {
      text: newTaskText.trim(),
      completed: false,
    }
    const addedTask = await addTaskToFirestore(userId, newTask) // This now includes the ID and createdAt
    setTasks([...tasks, addedTask]) // Update the local state with the new task
    setNewTaskText("") // Clear the input after adding a task
  }

  const deleteTask = async (taskId: string) => {
    const userId = auth.currentUser?.uid
    if (!userId) return
    await deleteTaskFromFirestore(userId, taskId)
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const toggleTask = async (taskId: string) => {
    const userId = auth.currentUser?.uid
    if (!userId) return
    const task = tasks.find((task) => task.id === taskId)
    if (task) {
      await updateTaskInFirestore(userId, taskId, {
        completed: !task.completed,
      })
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      )
    }
  }

  const editTask = async (taskId: string, newText: string) => {
    console.log(newText) // it shows docucument ID
    const userId = auth.currentUser?.uid
    if (!userId) return
    await updateTaskInFirestore(userId, taskId, { text: newText })
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    )
    console.log(newText)
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl p-5 dark:bg-[#414244]">
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
                <div className="flex space-x-4 mb-6">
                  <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTask()}
                    placeholder="Enter a new task"
                    className="form-input mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:bg-[#1d1d1f] dark:text-white"
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
                      deleteTask={() => deleteTask(task.id)}
                      toggleTask={() => toggleTask(task.id)}
                      editTask={(newText) => editTask(task.id, newText)}
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
