import Image from "next/image"

// WHEN USING LAYOUT FILL FROM IMAGE/NEXT COMPONENT, THE PARENT DIV MUST BE POSITION RELATIVE.
// otherwise the image will fill the Whole page
// parent div must have the dimensions defined

const MediumCard = ({ img, title }) => {

  return (
    <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
      <div className="relative h-80 w-80">
        <Image 
          src={img}
          layout="fill"
          className="rounded-xl"
          alt=""
        />
      </div>
      <h3 className="text-2xl mt-3">{title}</h3>
    </div>
  )
}

export default MediumCard