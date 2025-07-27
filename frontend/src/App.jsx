import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FeedbackForm from "./pages/FeedbackForm";
import ThankYou from "./pages/ThankYou";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Navbar added here */}
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <ToastContainer position="top-right" />
    </Router>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import FeedbackForm from "./pages/FeedbackForm";
// import ThankYou from "./pages/ThankYou";
// import AdminLogin from "./pages/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />

//         <div className="px-4 py-6 max-w-6xl mx-auto">
//           <Routes>
//             <Route path="/" element={<FeedbackForm />} />
//             <Route path="/thankyou" element={<ThankYou />} />
//             <Route path="/admin/login" element={<AdminLogin />} />
//             <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           </Routes>
//         </div>

//         <ToastContainer
//           position="top-right"
//           autoClose={2000}
//           hideProgressBar={false}
//           newestOnTop
//           closeOnClick
//           pauseOnHover
//           draggable
//           theme="light"
//         />
//       </div>
//     </Router>
//   );
// }

// export default App;
