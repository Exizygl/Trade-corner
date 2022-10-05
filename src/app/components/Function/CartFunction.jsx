import { useSelector, useDispatch } from "react-redux"
import { addProduct } from "../../shared/redux-store/panierSlice"






export const addProductCart = (e) => {
    console.log("(O-O)")
  

   
    
        const product = {
          id : e,
          number : 1
        }
  
        dispactch(addProduct(product))
        
    }