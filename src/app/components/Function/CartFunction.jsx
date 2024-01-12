import { useSelector, useDispatch } from "react-redux"
import { addProduct } from "../../shared/redux-store/panierSlice"






export const addProductCart = (e) => {
  
  

   
    
        const product = {
          id : e,
          number : 1
        }
  
        dispactch(addProduct(product))
        
    }