import { useRouter } from "next/router"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { format } from "date-fns"
import { isPlural } from "../utils"
import InfoCard from "../components/InfoCard"

const Search = ({ searchResults }) => {
  const router = useRouter()

  const { location, startDate, endDate, noOfGuests } = router.query
  const queryLocation = location

  const formatedStartDate = format(new Date(startDate), "MMM dd, yyyy")
  const formatedEndDate = format(new Date(endDate), "MMM dd, yyyy")
  const dateRange = `${formatedStartDate} - ${formatedEndDate}`

  return (
    <div>
      <Header placeholder={`${location} | ${dateRange} | ${noOfGuests} guest${isPlural(noOfGuests)}`}/>

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">300+ Stays - {dateRange} - for {noOfGuests} number{isPlural(noOfGuests)} of guest{isPlural(noOfGuests)}</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="custom_search_page_button">Cancellation Flexibility</p>
            <p className="custom_search_page_button">Type of Place</p>
            <p className="custom_search_page_button">Price</p>
            <p className="custom_search_page_button">Rooms and Beds</p>
            <p className="custom_search_page_button">More filters</p>
          </div>

          <div className="flex flex-col">
            {
              searchResults?.map(({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={`${img}_${location}_${title}`}
                  img={img}
                  location={location}
                  queryLocation={queryLocation}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              ))
            }
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Search

export const getServerSideProps = async () => {
  const searchResults = await fetch('https://links.papareact.com/isz')
    .then((response) => response.json())

    return {
      props: {
        searchResults
      }
    }
}
