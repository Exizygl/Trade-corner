import { useSelector, useDispatch } from 'react-redux';


export function addProductState(action) {

    list = useSelector((state) => state.auth.product)
 
    if(panier == null) return action.payload
    for(var i= 0; i<panier.length; i++){
      
        if(panier[i][0] == action.payload[0])return panier
    }
    return [...panier, action.payload]
}
