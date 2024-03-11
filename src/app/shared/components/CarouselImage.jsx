import React from 'react';
import fleche1 from '../../assets/images/Polygon-1.png';
import fleche2 from '../../assets/images/Polygon-2.png';
const CarouselImage = ({ imageList , changeImage, mainImage }) => {
    
    
    const precedent = () => {
        var prec = ""
        for(var i = 0; i < imageList.length; i++){
            if(mainImage == imageList[i]){
                if(i == 0){
                    console.log(imageList[imageList.length - 1])
                    prec = imageList[imageList.length - 1]
                }
                if (i > 0)
                prec = imageList[i - 1]
            }
        }
        return (
            <img src={fleche1} className="w-[40px] h-[35px] " onClick={() => {changeImage(prec)}}/>
        )
    }
    
    const suivant = () => {
        var suiv = ""
        for(var i = 0; i < imageList.length; i++){
            if(mainImage == imageList[i]){
                if(i == imageList.length - 1){
                    suiv = imageList[0]
                }
                if (i < imageList.length-1)
                suiv = imageList[i + 1]
            }     
        }
        return (
            <img src={fleche2} className=" w-[40px] h-[35px] " onClick={() => {changeImage(suiv)}}/> 
        )
    }
    
    const list = imageList.map(item => {
        return (
            <img src={`https://trade-corner-back.onrender.com/static/` + item}
                onError={(e) => (e.currentTarget.src = `https://trade-corner-back.onrender.com/static/default.jpg`)}
                className='w-[100px] aspect-square shrink object-cover'
                alt="Photo du produit"
                onClick={() => {
                    changeImage(item)
                }}
            />
        )
    })

    return (

        <div className="flex justify-around items-center h-[100px]">
            {precedent()}
            {list}
            {suivant()}
        </div>
    )


}


export default CarouselImage
