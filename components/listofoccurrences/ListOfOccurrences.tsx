'use client';
import { useNearbyList } from "@/hooks/useNearbyList";
import { refecthNearbyList } from "@/utils/stores/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

function ListOfOccurrences() {

  const [refecthList, setRefetchList] = useAtom(refecthNearbyList);
  const { data, refetch } = useNearbyList();
  useEffect(() => {
    console.log("Data", data);
    setRefetchList(false);
  }, [data, setRefetchList])

  useEffect(() => {
    if(refecthList) {
      refetch();
    }
  }, [refecthList, refetch])

  return (
    <aside className="w-[20rem] h-full bg-slate-300" style={{ height: 'calc(100dvh - 90px)' }}>

    </aside>
  )
}

export default ListOfOccurrences


