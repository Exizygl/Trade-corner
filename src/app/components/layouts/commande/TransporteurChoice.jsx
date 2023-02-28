import React from 'react';











const TransporteurChoice = ({ seller, transporteurs }) => {

    const List = () => {
    var choice = transporteurs.map(transporteur => {
        <input type="radio" id={transporteur.transporteur} name={seller} value={transporteur.transporteur}>
            <label for={transporteur.transporteur}>{transporteur.transporteur}</label>
        </input>

    })
}
    return (

        <div className='flex justify-between'>
            {List()}
        </div>
    )
}



export default TransporteurChoice