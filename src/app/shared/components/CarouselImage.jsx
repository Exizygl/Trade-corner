import React from 'react';

const CarouselImage = ({ imageList , changeImage }) => {
    
    const list = imageList.map(item => {


        return (
            <img src={`http://localhost:8080/static/` + item}
                onError={(e) => (e.currentTarget.src = `http://localhost:8080/static/default.jpg`)}
                className='ml-[3.125rem] mt-[2.813rem] m-12 w-[5.52rem] h-[5.46rem]'
                alt="preview"
                onClick={() => {
                    changeImage(item)
                }}
            />
        )
    })

    return (

        <div className="flex">
            {list}
        </div>
    )


}


export default CarouselImage
