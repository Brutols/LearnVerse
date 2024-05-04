import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProtectedRoutes from "./middlewares/protectedRoutes";
import AdminPage from "./pages/AdminPage";
import EditCourse from "./pages/EditCourse";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import BrowseCourses from "./pages/BrowseCourses";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/browseCourses" element={<BrowseCourses />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/editCourse/:id" element={<EditCourse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
