import { useEffect, useState } from 'react'

// Importar la configuración de Firebase
import appFirebase from '../src/Credenciales'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
const auth = getAuth(appFirebase);

// Importar componentes
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'

import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DeletedProducts from './components/DeletedProducts.jsx';

function App() {

  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        console.log(usuarioFirebase)
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <div className='bg-black min-h-screen'>
      <Router>
        <Routes>
          <Route
            path="/"
            element={usuario ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/login"
            element={usuario ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/home"
            element={usuario ? <Home correoUsuario={usuario.email} /> : <Navigate to="/" />}
          />
          <Route
            path="/deleted-products"
            element={usuario ? <DeletedProducts correoUsuario={usuario.email} /> : <Navigate to="/" />}
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App
