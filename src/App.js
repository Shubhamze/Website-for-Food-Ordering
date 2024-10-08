// import logo from './logo.svg';
import './App.css';
import Home from './screen/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './screen/Login';
import Signup from './screen/Signup';
import { CartProvider } from './componants/ContextReducer';
import MyOrder from './screen/MyOrder';
function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/createuser' element={<Signup/>}/>
          <Route exact path='/MyOrder' element={<MyOrder/>}/>
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
