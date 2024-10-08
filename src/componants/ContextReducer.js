import React, { createContext, useContext, useReducer } from "react";


const CartStatecContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            
            return [...state,{id:action.id,price:action.price,img:action.img,qty:action.qty,size:action.size,name:action.name}]
        case "REMOVE":
                let newArr = [...state]
                newArr.splice(action.index, 1)
                return newArr;
                case "UPDATE":
                    let arr = [...state]
                   
                    arr.map((food, index) => {
                        // console.log(action.id,action.qty,action.price,action.size);
                        if (food.id === action.id&&food.size==action.size) {
                            // console.log(food.qty, parseInt(action.qty), action.price + food.price)
                            arr[index] = { ...food, qty: action.qty, price: action.price}
                        }
                        return arr;
                    })
                    return arr;
        case "DROP":
            let empArray=[];
            return empArray;
        default:
            console.log("Error in reducer");
    }
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStatecContext.Provider value={state}>
                {children}
            </CartStatecContext.Provider>

        </CartDispatchContext.Provider>
    )

}

export const useCart=()=>useContext(CartStatecContext);
export const useDispatchCart=()=>useContext(CartDispatchContext);