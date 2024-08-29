import Header from "@/components/header/Header";
import ListOfOccurrences from "@/components/listofoccurrences/ListOfOccurrences";
import Map from "@/components/map/Map";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white">
        <Header/>
        <section className="py-2 px-4 flex items-center gap-3">
            <ListOfOccurrences/>
            <Map/>
        </section>
    </main>
  );
}
