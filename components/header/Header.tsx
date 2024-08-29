
import { BsSearch } from "react-icons/bs";

function Header() {
  return (
    <header className="w-full h-full flex items-center justify-between py-4 px-16 bg-[#ecebeb]">
        <h1>Travel Advisor</h1>
        <div className="flex gap-2">
            <form action="" className="flex gap-2">
                <label htmlFor="search-places">Explore novos lugares</label>
                <div className="relative">
                    <BsSearch className="absolute top-[6px] left-2"/>
                    <input className="w-48 pr-2 pl-7 border-2 border-black rounded-md" type="text" id="search-places" /> {/* Feature - Autocomplete */}
                </div>
            </form>
        </div>
    </header>
  )
}

export default Header
