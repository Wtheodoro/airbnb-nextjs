import { useState, useEffect } from "react"
import Image from "next/image"
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from "@heroicons/react/solid"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/router";

const Header = ({ placeholder, animated }) => {
  const [scrollTop, setScrollTop] = useState(animated ? 0 : 1)
  const [searchInput, setSearchInput] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [numberOfGuests, setNumberOfGuests] = useState(2)

  const router = useRouter()

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  }

  useEffect(() => {
    if (!animated) return

    const onScroll = (event) => {
      setScrollTop(event.target.documentElement.scrollTop)
    }
    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [scrollTop, animated])

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const resetInput = () => {
    setSearchInput("")
  }

  const howManyDaysCounter = () => {   
    const difference = Math.abs(startDate - endDate)
    const days = difference/(1000 * 3600 * 24)
    return days + 1
  }

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests: numberOfGuests,
        days: howManyDaysCounter()
      }
    })
    setSearchInput('')
  }

  return (
    <header className={
      !!scrollTop || searchInput
      ? "sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10 transform duration-300"
      : "sticky top-0 z-50 grid grid-cols-3 bg-black p-8 md:px-10 transform duration-300"
      }>
      <div className={
        !!scrollTop || searchInput
        ? "relative flex rangess-center h-10 cursor-pointer my-auto transform duration-300"
        : "relative flex rangess-center h-8 cursor-pointer my-auto transform duration-300"
      }>
        <Image
          src='https://links.papareact.com/qd3'
          layout="fill"
          objectFit="contain"
          objectPosition="left"
          alt=""
          onClick={() => router.push("/")}
        />
      </div>

      <div className={
        !!scrollTop || searchInput
        ? "flex items-center md:border-2 rounded-full py-2 md:shadow-sm"
        : "flex items-center md:border-2 rounded-full py-0 md:shadow-sm"
      }>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder={placeholder || "Start your search"}
          className={
            !!scrollTop || searchInput
            ? "flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
            : "flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-white"
          }
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"/>
      </div>

      <div className={
        !!scrollTop || searchInput
        ? "flex items-center justify-end space-x-4 text-gray-500"
        : "flex items-center justify-end space-x-4 text-white"
      }>
        <p className="hidden md:inline">Become a Host</p>
        <GlobeAltIcon className="h-6 cursor-pointer"/>

        <div className={
          !!scrollTop || searchInput
          ? "flex items-center space-x-2 border-2 p-2 rounded-full text-gray-500"
          : "flex items-center space-x-2 border-2 p-2 rounded-full text-white"
        }>
          <MenuIcon className="h-6"/>
          <UserCircleIcon className="h-6"/>
        </div>
      </div>

      {
        searchInput &&
        <div className="flex flex-col col-span-3 mx-auto mt-2">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#fd5861"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>

            <UsersIcon className="h-5"/>
            <input
              type="number"
              min={1}
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>
          <div className="flex">
            <button className="flex-grow text-gray-500" onClick={resetInput}>Cancel</button>
            <button className="flex-grow bg-red-400 text-white rounded-full" onClick={search}>Search</button>
          </div>
        </div>
      }
    </header>
  )
}

export default Header
