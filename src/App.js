import { useEffect, useState } from 'react';
import './App.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../src/config/firestore'
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InvoiceDetails from './pages/InvoiceDetails';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  useEffect(() => {

  })
  return (
    <div className="App">
      {/* {
        isAuthenticated != true ? (<Login setIsAuthenticated={setIsAuthenticated}/>) :
          (<div> */}
            <Sidebar />

            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/invoice/:id' element={<InvoiceDetails />} />
              </Routes>
            </BrowserRouter>

          {/* </div>)
      } */}


    </div>
  );
}

export default App;