import React from 'react';
import { useState } from 'react';

const PreviewUserImage = ({ file }) => {
    const [preview, setPreview] = useState(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreview(reader.result);
    }

    return (
        <div >
            <img src={preview} className='m-auto' alt="preview" width={200} height={200} />
        </div>
    );
};

export default PreviewUserImage;