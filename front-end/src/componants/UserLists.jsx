import React, { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";

const UserLists = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  const fetchtasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchtasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/tasks",
        { title, description, dueDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message || "Task created successfully");
      setTitle("");
      setDescription("");
      setDueDate("");
      setShowForm(false);
      fetchtasks();
    } catch (err) {
      console.error(err.message);
      alert("Error creating task");
    }
  };

  return (
    <>
      <div className="mt-4 m-5 flex flex-col md:flex-row justify-between gap-3 md:gap-0">
        <h2 className="text-lg font-semibold">My Tasks</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 shadow-xl text-white hover:bg-blue-600 font-bold py-2 px-6 rounded-xl flex items-center gap-2 text-sm md:text-base"
        >
          <i className="bi bi-plus"></i>
          <span>New Task</span>
        </button>
      </div>

      {/* Task Form */}
      {showForm && (
        <div className="m-5 p-5 bg-gray-100 rounded-xl shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md"
          >
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            />
            <input
              type="text"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Save
            </button>
          </form>
        </div>
      )}

      {/* Task List */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 m-5">
        {loading ? (
          <div className="p-5 text-center text-gray-600 font-medium">
            Loading...
          </div>
        ) : tasks.length === 0 ? (
          <div className="p-5 text-center text-gray-600 font-medium">
            <p>No tasks found.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600"
            >
              + Create Task
            </button>
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">Task Title</th>
                <th scope="col" className="px-6 py-3">Task Description</th>
                <th scope="col" className="px-6 py-3">Task Due Date</th>
                <th scope="col" className="px-6 py-3">Created User</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            {tasks.map((x) => (
              <Table key={x._id} refreshtasks={fetchtasks} tasks={x} />
            ))}
          </table>
        )}
      </div>
    </>
  );
};

export default UserLists;
