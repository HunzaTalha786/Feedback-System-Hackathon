import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [course, setCourse] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get(`/feedback?course=${course}&page=${page}&limit=${limit}`);
      if (Array.isArray(res.data.feedbacks)) {
        setFeedbacks(res.data.feedbacks);
        setTotal(res.data.total);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load feedbacks");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [course, page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
      await api.delete(`/feedback/${id}`);
      toast.success("Feedback deleted");
      fetchFeedbacks(); // Refresh data
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete feedback");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 to-blue-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-12 tracking-wide">
          Admin Dashboard
        </h1>

        {/* Search Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="🔍 Search by course..."
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
              setPage(1);
            }}
            className="px-5 py-3 w-full max-w-md border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 placeholder-gray-400 text-base"
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Total Feedbacks", value: total },
            { title: "Filtered Course", value: course || "All" },
            { title: "Current Page", value: page },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:scale-105"
            >
              <p className="text-gray-500 text-sm mb-1">{card.title}</p>
              <h2 className="text-2xl font-bold text-blue-600">{card.value}</h2>
            </div>
          ))}
        </div>

        {/* Table View */}
        <div className="hidden sm:block w-full">
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-[700px] w-full text-sm text-left text-gray-800">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Comments</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.length > 0 ? (
                  feedbacks.map((f, idx) => (
                    <tr key={f._id || idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-4">{f.name}</td>
                      <td className="p-4">{f.email}</td>
                      <td className="p-4">{f.course}</td>
                      <td className="p-4">{f.rating}</td>
                      <td className="p-4">{f.comments}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDelete(f._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-500 italic">
                      No feedback found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View */}
        <div className="block sm:hidden space-y-5 mt-6">
          {feedbacks.length === 0 ? (
            <div className="text-center text-gray-500 italic">No feedback found.</div>
          ) : (
            feedbacks.map((f) => (
              <div key={f._id} className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-blue-600 font-bold text-lg">{f.name}</h3>
                  <span className="text-sm text-gray-500">{f.rating}⭐</span>
                </div>
                <div className="mt-3 text-sm space-y-1">
                  <div>
                    <span className="text-gray-400">Email:</span>{" "}
                    <span className="text-gray-800">{f.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Course:</span>{" "}
                    <span className="text-gray-800">{f.course}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Comments:</span>{" "}
                    <span className="text-gray-800">{f.comments}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(f._id)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm transition"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-10 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-gray-600 text-sm">Page {page}</span>
          <button
            onClick={() => {
              const maxPage = Math.ceil(total / limit);
              if (page < maxPage) setPage(page + 1);
            }}
            disabled={page >= Math.ceil(total / limit)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
