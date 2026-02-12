import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./componnents/login/LogIn"
import { ToastContainer } from 'react-toastify';
import Register from './componnents/register/Register';
import Home from './componnents/home/Home';

function App() {
  return (
    <div className='App'>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={< Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
 