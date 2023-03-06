import React from 'react';











const TransporteurChoice = ({ seller, transporteurs }) => {
    
    console.log(seller)
    const List = () => {

        var choice = transporteurs.map(transporteur => {
            
            return (
                <div>
                    <input type="radio" id={transporteur.transporteur} name={seller} value={transporteur.transporteur} onChange={handleChange}/>
                        <label for={transporteur.transporteur}>{transporteur.transporteur}</label>
                        
                  
                </div>

            )

        })

        return (
            <div>
                {choice}
            </div>
        )
    }
    return (

        <div className='flex justify-between'>
            {List()}
            
        </div>
    )
}



export default TransporteurChoice