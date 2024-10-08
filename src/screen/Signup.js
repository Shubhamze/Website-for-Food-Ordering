import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './SignUp.css'
import Navbar from '../componants/Navbar';
import Footer from '../componants/Footer';
export default function Signup() {
  let navigate=useNavigate();
  const [usercred,setusercred]=useState({name:"",email:"",password:"",location:""})
let [xx,setxx]=useState(true);
    const handlesubmit= async(e)=>{
            e.preventDefault();
            const response=await fetch('http://localhost:5000/api/createuser',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name:usercred.name,email:usercred.email,password:usercred.password,location:usercred.location})
            });
            const resp=await response.json();
            
            console.log(resp.status);
            if(!resp.success){
              setxx({xx:false})
              // console.log(xx);
            // alert("Enter valid credentials or User already exists!");
          }
            if(resp.success) {
                navigate('/login')
            }

    }
    const changehandler=(event)=>{
      setusercred({...usercred,[event.target.name]:event.target.value})
    }
  return (
    <>
    <section className="vh-100 bg-image " 

  style={{"background-image": "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
    <Navbar/>
  <div className="mask d-flex align-items-center h-101 " style={{backgroundColor:"#198754"}}>
    <div className="container h-100">

      <div className="row d-flex justify-content-center align-items-center  h-80  mt-5 mb-5">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6 mb-5 ">
          <div className="card gradient-custom-3 mb-3" style={{"border-radius": "15px"}}>
            <div className="card-body p-5">
            <img src="https://logos-world.net/wp-content/uploads/2022/04/Gofood-Logo.png"
                    style={{width: "185px"}} alt="logo"/>
              <h2 className="text-uppercase mb-5">WelCome To GO FOOD !</h2>

              <form onSubmit={handlesubmit}>

                <div className="form-outline mb-4">
                  <input type="text" className="form-control" name='name' value={usercred.name} onChange={changehandler} placeholder="Name"/>
                  {/* <label className="form-label" for="form3Example1cg">Your Name</label> */}
                </div>

                <div className="form-outline mb-4">
                 <input type="email" className="form-control" name='email' value={usercred.email} onChange={changehandler} placeholder="Email Id"/>
                  {/* <label className="form-label" for="form3Example3cg">Your Email</label> */}
                </div>

                <div className="form-outline mb-4">
                   <input type="password" className="form-control" name='password'  value={usercred.password} onChange={changehandler} placeholder="Password"/>
                  {/* <label className="form-label" for="form3Example4cg">Password</label> */}
                </div>

                <div className="form-outline mb-1">
                    
                  <input type="text" className="form-control" name='location' value={usercred.location} onChange={changehandler} placeholder="Location"/>
                     {/* <label className="form-label" for="form3Example4cdg">Location</label> */}
                </div>
                <div>
      {xx.xx===false?
      
      <div className="d-flex mb-2 text-danger"
      style={{fontSize:"12px"}}> ⓘ Enter valid details or User already exist!</div>
      :""}
             </div>
                <div className="form-check d-flex justify-content-center mb-5">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" required="true" />
                  <label className="form-check-label" for="form2Example3g">
                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                  </label>
                </div>
 
                <div className="d-flex justify-content-center">
                  <button type="submit"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                    className="fw-bold text-body"><Link to='/login'>Already A User</Link></a></p>

              </form>
            </div>
              <Footer />
      
          </div>
        </div>
      </div>
    </div>
    
  </div>
</section>
    {/* <div className="container"> 
    <form onSubmit={handlesubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={usercred.name} onChange={changehandler}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={usercred.email} onChange={changehandler}/>

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password'  value={usercred.password} onChange={changehandler}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputLocation" className="form-label">Location</label>
    <input type="text" className="form-control" name='location' value={usercred.location} onChange={changehandler}/>
    
  </div>
  <button type="submit" className="btn btn-success">Submit</button>
  <Link to='/login' className='m-3 btn btn-danger'>Already A User</Link>
</form></div> */}
   
    
    </>
  )
}
