'use client';
import { useNearbyList } from "@/hooks/useNearbyList";
import { refecthNearbyList, restaurantsAPIData } from "@/utils/stores/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";


function ListOfOccurrences() {

  const [refecthList, setRefetchList] = useAtom(refecthNearbyList);
  const [restaurantsData, setRestaurantsData] = useAtom(restaurantsAPIData);
  const { data, refetch, isFetching } = useNearbyList();
  useEffect(() => {
    setRestaurantsData(data?.elements);
    console.log("Data", data?.elements);
    console.log("Atualizou Data")
  }, [data, refecthList, setRestaurantsData])

  console.log("isFetching", isFetching)

  useEffect(() => {
    if(refecthList) {
      refetch();
      console.log("------------------Deu Refetching!!!")
    }
  }, [refecthList])

  return (
    <aside className="w-[20rem] h-full shadow-xl rounded-md flex flex-col items-center gap-3 p-3 overflow-y-scroll scroll-smooth" style={{ height: 'calc(100dvh - 90px)' }}>
        <>
            {
                restaurantsData ? (
                    restaurantsData.map((restaurant, index) => 
                    ( 
                        <>
                          {
                            restaurant.tags.name ? 
                            (
                              <div className="w-full h-full max-h-[4rem] bg-slate-50 rounded-md flex flex-col justify-center items-center p-3">
                                  <p className="text-sm">{restaurant.tags.name}</p>
                              </div>
                            ) 
                            : 
                            (
                              <>
                              </>
                            )
                          }
                        </>
                        
                    ))
                ) 
                : 
                (
                    <p>No data available, please refresh the page</p>
                )
            }
        </>
    </aside>
  )
}

export default ListOfOccurrences


