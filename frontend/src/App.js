import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
