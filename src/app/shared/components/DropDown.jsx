import React from 'react';

const Dropdown = ({ label , Category }) => {



    return (

        <li onClick={() => { Category(label) }}>
            {label}
        </li>
    )


}


export default Dropdown
