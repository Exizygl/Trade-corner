import React from 'react';











const TransporteurChoice = ({transporteurs }) => {
    
    
    const List = () => {

        var choice = transporteurs.map(transporteur => {
            
            return (
                <div>
                    <input type="radio" id={transporteur.transporteur} name="transporteur" value={transporteur.transporteur}/>
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