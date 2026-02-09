import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./componnents/LogIn";
import { ToastContainer } from 'react-toastify';
import Register from './componnents/Register';

function App() {
  return (
    <div className='App'>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={< Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
 