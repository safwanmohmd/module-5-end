import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const TableBody = ({ tasks, refreshtasks }) => {
  const [user, setUser] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(tasks.title);
  const [description, setDescription] = useState(tasks.description);
  const [dueDate, setDueDate] = useState(tasks.dueDate);
  const [status, setStatus] = useState(tasks.status);
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/auth/user/${tasks.user}`);
      setUser(res.data.user.name);
      console.log(res.data.user.name);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/tasks/${tasks._id}`,
        { title, description, dueDate, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      refreshtasks();
      alert(res.data.message);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/tasks/${tasks._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message || "tasjs deleted successfully");
      refreshtasks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete customer");
    }
  };

  return (
    <tbody>
      <tr
        className={`${
          tasks.status === "completed" ? "bg-green-300 hover:bg-green-400" : "bg-white" } border-b hover:bg-gray-50`}
      >
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
            />
          </div>
        </td>

        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          ) : (
            tasks.title
          )}
        </th>

        <td className="px-6 py-4">
          {isEditing ? (
            <input
              type="email"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          ) : (
            tasks.description
          )}
        </td>

        <td className="px-6 py-4">
          {isEditing ? (
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          ) : (
            tasks.dueDate
          )}
        </td>

        <td className="px-6 py-4">{user}</td>
        <td className="px-6 py-4">
          {" "}
          {isEditing ? (
            <select
              name=""
              id=""
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">pending</option>
              <option value="in-progress">in-progress</option>
              <option value="completed">completed</option>
            </select>
          ) : (
            tasks.status
          )}{" "}
        </td>

        <td className="flex items-center px-6 py-4 gap-2 flex-wrap">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-200 text-green-600 px-4 py-2 rounded hover:underline"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setTitle(tasks.title);
                  setDescription(tasks.description);
                  setDueDate(tasks.dueDate);
                }}
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded hover:underline"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-200 text-blue-600 px-4 py-2 rounded hover:underline"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-200 text-red-600 px-4 py-2 rounded hover:underline"
              >
                Remove
              </button>
            </>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default TableBody;
