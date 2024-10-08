import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Modal from '../Model';
import MyCart from '../screen/MyCart';
import { useCart } from './ContextReducer';
export default function Navbar() {
  const navigate=useNavigate();
  const handlelLogout=()=>{
    localStorage.removeItem("authToken");
    localStorage.removeItem("UserEmail");
    navigate('/')

  }
  let data=useCart();
  const [cartview,setCartView]=useState(false);
  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">DelciousFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {
          (localStorage.getItem("authToken"))?
          <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/MyOrder">My Orders</Link>
        </li>
        :""
        }
      </ul>
      {
        (!localStorage.getItem("authToken"))?
        <div className='d-flex'>
        <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
        <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
       
    </div> :<>
    <div className='btn text-success bg-white mx-2' onClick={()=>{setCartView(true)}}>My Cart{" "}
    <Badge pill bg="danger">{data.length}</Badge>
    </div>
    {
      cartview?<Modal onClose={()=>{setCartView(false)}}><MyCart/></Modal>:null
    }
    <div className='btn text-white bg-danger mx-2' onClick={handlelLogout}>Logout</div>
    </>
      }
      
    </div>
  </div>
</nav>
    </div>
  )
}

