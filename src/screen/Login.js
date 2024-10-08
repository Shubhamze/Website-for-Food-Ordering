import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './Login.css';
import Navbar from '../componants/Navbar';
import Footer from '../componants/Footer';
export default function Login() {
  let navigate=useNavigate();
  let [xx,setxx]=useState(true);
  const [usercred,setusercred]=useState({email:"",password:""});
  const handlesubmit= async(e)=>{
    e.preventDefault();
    const response=await fetch('http://localhost:5000/api/loginuser',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:usercred.email,password:usercred.password})
    });
    const resp=await response.json();
    console.log(resp);
    if(!resp.success)
    setxx({xx:false})
    if(resp.success){ 
      localStorage.setItem("UserEmail",usercred.email);
      localStorage.setItem("authToken",resp.AuthToken);
      console.log(localStorage.getItem("authToken"));
    navigate('/');
    }

}
const changehandler=(event)=>{
  setusercred({...usercred,[event.target.name]:event.target.value})
}
  return (
    <>
    <Navbar/>
    <section className="h-100 gradient-form" style={{"background-color" :"#198754"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black gradient-custom-2">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                  <img src="https://logos-world.net/wp-content/uploads/2022/04/Gofood-Logo.png"
                    style={{width: "185px"}} alt="logo"/>
                  <h4 className="mt-1 mb-5 pb-1">Happy to see you again!</h4>
                </div>

                <form onSubmit={handlesubmit}>
                  <p>Please login to your account</p>

                  <div className="form-outline mb-4">
                    <input type="email" className="form-control" name='email' value={usercred.email} onChange={changehandler} placeholder="Email Id"/>
                    {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
                  </div>

                  <div className="form-outline mb-1">
                     <input type="password" className="form-control" name='password'  value={usercred.password} onChange={changehandler} placeholder="Password"/>
                    {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                  </div>
                  
                  <div>
      {xx.xx===false?
      
      <div className="d-flex mb-2 text-danger"
      style={{fontSize:"12px"}}> ⓘ Username or Password is invalid !</div>
      :""}
             </div>
                  <div className="text-center pt-1 mb-5 pb-1">
                    <button className="btn btn-success btn-block fa-lg mb-3" type="submit">Login</button>
                    <br />
                    <a className="text-muted" href="#!">Forgot password?</a>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <Link to='/createuser' className='m-3 btn btn-danger'>Create New</Link>
                  </div>

                </form>

              </div>
              
            </div>
            <div className="col-lg-6 d-flex align-items-center ">
              <div className="text-black px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    </div>
  </div>
  
</section>
{/* //     <div className='container mt-10'>
//        <form onSubmit={handlesubmit}>
    
//   <div className="mb-3">
//     <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//     <input type="email" className="form-control" name='email' value={usercred.email} onChange={changehandler}/>

//   </div>
//   <div className="mb-3">
//     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//     <input type="password" className="form-control" name='password'  value={usercred.password} onChange={changehandler}/>
//   </div>
 
//   <button type="submit" className="btn btn-success">Submit</button>
//   <Link to='/createuser' className='m-3 btn btn-danger'>New User</Link>
// </form>
//     </div> */}


</>
  )
}
