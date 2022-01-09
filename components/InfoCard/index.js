import { HeartIcon } from "@heroicons/react/outline"
import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image"

const InfoCard = ({ img, location, queryLocation, title, description, star, price, days }) => {
  // JUST BECAUSE API RETURNS THE SAME LOCATION
  const redefineLocation = location.replace("London", queryLocation)

  const getTotal = () => {
    const pricePerDay = Number(price.split('£')[1].split('/')[0].trim())
    return (pricePerDay * days).toFixed(2)
  }

  return (
    <div className="flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image src={img} layout="fill" objectFit="cover" className="rounded-2xl"/>
      </div>

      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>{redefineLocation}</p>
          <HeartIcon className="h-7 cursor-pointer"/>
        </div>

        <h4 className="text-xl">{title}</h4>

        <div className="border-b w-10 pt-2"/>

        <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400"/>
            {star.toFixed(1)}
          </p>

          <div>
            <p className="text-lg lg:text-2xl font-semibold pb-2">{price.replace('£', '$')}</p>
            <p className="text-right font-extralight">{getTotal()}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default InfoCard