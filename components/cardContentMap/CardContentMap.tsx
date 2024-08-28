import Image from "next/image";
import { useEffect, useState } from "react";
import { TiStarFullOutline , TiStarHalfOutline } from "react-icons/ti";


function CardContentMap() {

    const [arrRatingStars, setArrRatingStars] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const settingRatingStars = () => {
            const ratingNumber = '4.5';
            const difference = parseFloat(ratingNumber) - parseInt(ratingNumber);
            let arrRating: React.ReactNode[] = []
            for(let i = 0; i < parseInt(ratingNumber); i++) {
                arrRating.push(<TiStarFullOutline />)
            }
            if(difference > 0) {
                arrRating.push(<TiStarHalfOutline />)
            }
            setArrRatingStars(arrRating);
        }
        settingRatingStars()
    }, [])
    
    return (
        <div className="w-[11rem] max-h-[11rem] h-full bg-white rounded-md flex flex-col p-3 gap-2 absolute top-5">
            <p className="text-sm text-center">Title Reastaurant Name</p>
            {/* <Image src="/map.png" alt="map" width={300} height={300}/> */}
            <div className="w-[150px] h-[130px] bg-slate-200"></div>
            {/* Rating */}
            <div className="text-yellow-300 text-lg w-full flex justify-center">
                {arrRatingStars}
            </div>
        </div>
    )
}

export default CardContentMap
