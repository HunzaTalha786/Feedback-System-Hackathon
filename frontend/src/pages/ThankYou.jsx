import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-6 md:p-10 text-center max-w-md w-full animate-fade-in">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3159/3159066.png"
          alt="Thank You"
          className="w-24 h-24 mx-auto mb-4 drop-shadow-lg"
        />
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-3">
          Thank You!
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-6 leading-relaxed">
          We appreciate your feedback. It helps us improve and grow!
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
