import React, { useState } from "react"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { FaEdit, FaSave } from "react-icons/fa"
import { Task } from "@/lib/DataInterfaces"

type TodoItemProps = {
  task: Task
  deleteTask: (id: string) => void // Updated to string
  toggleTask: (id: string) => void // Updated to string
  editTask: (newText: string) => void // Updated to string
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  deleteTask,
  toggleTask,
  editTask,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(task.text)

  const handleEdit = () => {
    if (isEditing && editedText.trim() !== "") {
      editTask(editedText.trim())
    }
    setIsEditing(!isEditing)
  }

  return (
    <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl shadow dark:bg-[#1d1d1f]">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="form-checkbox h-5 w-5"
      />
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="form-input flex-1"
        />
      ) : (
        <span
          className={`flex-1 text-lg ${task.completed ? "line-through" : ""}`}
        >
          {task.text}
          <span className="block text-sm text-gray-500">
            {new Date(task.updatedAt).toLocaleString()}
          </span>
        </span>
      )}
      {!task.completed && (
        <button
          onClick={handleEdit}
          className="text-gray-600 hover:text-gray-900"
        >
          {isEditing ? <FaSave /> : <FaEdit />}
        </button>
      )}
      <button
        onClick={() => deleteTask(task.id)}
        className="text-gray-600 hover:text-gray-900"
      >
        <RiDeleteBin5Fill />
      </button>
    </div>
  )
}

export default TodoItem
