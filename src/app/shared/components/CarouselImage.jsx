import React from 'react';
import fleche1 from '../../assets/images/Polygon-1.png';
import fleche2 from '../../assets/images/Polygon-2.png';
const CarouselImage = ({ imageList , changeImage, mainImage }) => {
    
    
    const precedent = () => {
        var prec = ""
        console.log("toya")
        for(var i = 0; i < imageList.length; i++){
          
            if(mainImage == imageList[i]){
                console.log(i)
                if(i == 0){
                    console.log(imageList[imageList.length - 1])
                    prec = imageList[imageList.length - 1]
                }

                if (i > 0)
                prec = imageList[i - 1]

            }

           
        }
       
            return (
                <img src={fleche1} className="w-[40px] h-[35px] mt-[3.813rem]" onClick={() => {
                    changeImage(prec)
                }}/>
            )
        }
    
    const suivent = () => {
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
                <img src={fleche2} className=" w-[40px] h-[35px] ml-[3.125rem] mt-[3.813rem]" onClick={() => {
                    changeImage(suiv)
                }}/> 
            )
        }
    
    const list = imageList.map(item => {


        return (
            <img src={`http://localhost:8080/static/` + item}
                onError={(e) => (e.currentTarget.src = `http://localhost:8080/static/default.jpg`)}
                className='ml-[3.125rem] mt-[2.813rem] w-[5.52rem] h-[5.46rem]'
                alt="preview"
                onClick={() => {
                    changeImage(item)
                }}
            />
        )
    })

    return (

        <div className="flex">
            {precedent()}
            {list}
            {suivent()}
        </div>
    )


}


export default CarouselImage
