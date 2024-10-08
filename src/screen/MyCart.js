import React from 'react'
// import Delete from '@material-ui/icons/Delete'
import { useCart,useDispatchCart } from '../componants/ContextReducer';
// import trash from "../trash.svg"
export default function MyCart() {
    let data=useCart();
    let dispatch=useDispatchCart();
    if(data.length===0)
    {
        return(
            <div className="m-5 w-100 text-center fs-10 text-white">
                The Cart is Empty!
            </div>
        )
    }
    const handleCheckOut=async()=>{
        let userEmail=localStorage.getItem("UserEmail");
        let response=await fetch("http://localhost:5000/api/orderData",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                order_data:data,
                email:userEmail,
                order_date:new Date().toDateString()
            })
        });
        console.log("order response: ", response)
        if(response.status===200)
        {
            dispatch({type:"DROP"})
          }
          window.alert("Your Order is Placed Successfully!")
    }
    let totalprice=data.reduce((total,food)=>total+food.price,0)
  return (
      <div>
        {/* {console.log(data)} */}
      <div className="container m-auto mt-5 table-responsive-sm table-responsive-m">
        <table className="table table-hover">
            <thead className="text-success fs-4">
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>Option</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'></th>
                </tr>
            </thead>
            <tbody>
            {data.map((food, index) => (
              <tr>
                <th className='text-white' scope='row' >{index + 1}</th>
                <td className='text-white' >{food.name}</td>
                <td className='text-white'>{food.qty}</td>
                <td className='text-white'>{food.size}</td>
                <td className='text-white'>{food.price}</td>
                <td className='text-white' ><button type="button" className="btn p-0 bg-danger text-white" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>remove</button> </td></tr>
            ))}
          </tbody>
        </table>
      <div><h1 className='fs-2 text-white'>Total Price: {totalprice}/-</h1></div>
      <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>
    </div>
  )
}
