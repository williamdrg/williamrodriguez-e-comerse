import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Purchases from './pages/Purchases';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <div className="App">
        {
        isLoading && <Loader/>
        }  
        <Navbar/>
        <Routes>
          <Route
          path='/'
          element={<Home/>}
          />
          <Route
          path='/product/:id'
          element={<ProductDetail/>}
          />
          <Route
          path='/login'
          element={<Login/>}
          />
          <Route element={<ProtectedRoute/>}>
            <Route
            path='/purchases'
            element={<Purchases/>}
            />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App

