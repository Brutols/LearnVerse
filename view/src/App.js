import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Homepage from './pages/Homepage';
import ProtectedRoutes from './middlewares/protectedRoutes';
import AdminPage from './pages/AdminPage';
import EditCourse from './pages/EditCourse';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/editCourse/:id' element={<EditCourse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
