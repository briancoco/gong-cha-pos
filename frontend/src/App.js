import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Categories from './pages/Categories';
import Drinks from './pages/Drinks';
import Drink from './pages/Drink';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/register' element={<Register />} />
          <Route path='/order'>
            <Route index element={<Categories />} />
            <Route path=':category'>
              <Route index element={<Drinks />} />
              <Route path=':id' element={<Drink />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
