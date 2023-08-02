import React from 'react';











const TransporteurChoice = ({transporteurs, updateTransporteur}) => {
    
    
    const List = () => {

        // var x = 0

        var choice = transporteurs.map(transporteur => {
            // x++;
            return (
                <div>
                    <input type="radio" id={transporteur.transporteur}  name="transporteur"  value={transporteur.transporteur} onClick={() => { updateTransporteur(transporteur.transporteur) }}/>
                        <label for={transporteur.transporteur}>{transporteur.transporteur}</label>
                        
                </div>

            );

            

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