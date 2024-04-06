import React, { useState } from "react"
import { Task } from "../models/Task"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { FaEdit } from "react-icons/fa"
import { FaSave } from "react-icons/fa"

type TodoItemProps = {
  task: Task
  deleteTask: (id: number) => void
  toggleTask: (id: number) => void
  editTask: (id: number, newText: string) => void
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
      editTask(task.id, editedText.trim())
    }
    setIsEditing(!isEditing)
  }

  return (
    <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl shadow  dark:bg-[#1d1d1f]">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="form-checkbox h-5 w-5 bg-gray-300"
      />
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="form-input flex-1  "
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
          className="text-gray-600 hover:text-gray-900 text-icon-base md:text-icon-md lg:text-icon-lg"
        >
          {isEditing ? (
            <FaSave className="w-full h-full" />
          ) : (
            <FaEdit className="w-full h-full" />
          )}{" "}
          {/* Replace 'Save' with the MdEditDocument icon */}
        </button>
      )}
      <button
        className="text-icon-base md:text-icon-md lg:text-icon-lg"
        onClick={() => deleteTask(task.id)}
      >
        <RiDeleteBin5Fill className="w-full h-full" />
      </button>
    </div>
  )
}

export default TodoItem
