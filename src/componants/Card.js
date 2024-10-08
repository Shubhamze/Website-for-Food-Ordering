import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';
export default function Card(props) {
    let options=props.options;
    let priceoptions=Object.keys(options);
    let foodItem=props.foodItem;
    let data=useCart();
    const priceref=useRef();
    let dispatch=useDispatchCart();
    const [qty,setQty]=useState(1);
    const [size,setSize]=useState("");
    const handleAddCart = async () => {
        let food=[];
        
    for (const item of data) {
      if (item.id === foodItem._id&&item.size===size) {
        food = item;

        break;
      }
    }
    // console.log(food,size)
    // console.log()
    // console.log(food.size,data,"YES");
    // console.log(food.size===size)
    if (food !== []) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty, size:size })
        //   console.log(qty)
          return
        }
        else if (food.size !== size) {
          await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
          console.log("Size different so simply ADD one more to the list")
          return
        }
        return
      }
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
    
    
        // setBtnEnable(true)
    
      }
    

    let finalPrice=qty * parseInt(options[size]);
    useEffect(()=>{
        setSize(priceref.current.value);
    },[])
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img className="card-img-top" src={props.foodItem.img} alt="..." style={{ height:"150px",objectFit: "fill !important" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        {/* <p className="card-text">{props.Discription}</p> */}
                        <div className='container w-100'>
                            <select className='m-2 h-100  bg-success rounded text-light' onChange={(e)=>{setQty(e.target.value)}}>
                                {
                                    Array.from(Array(6), (e, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1} className="text-light">{i + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <select className='m-2 h-100  bg-success rounded text-light' ref={priceref} onChange={(e)=>setSize(e.target.value)}>
                               {
                                priceoptions.map((data)=>{
                                    return (<option key={data} value={data}>{data}</option>)
                                })
                               }
                            </select>
                            <div className='fs-5 h-100 d-inline'>
                            ₹{finalPrice}/-
                            </div>
                        </div>
                            <hr />
                            <button className={'btn btn-success justify-center ms-2'} onClick={handleAddCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
