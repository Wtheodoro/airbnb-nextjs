import Image from "next/image"
// on tailwind we can define the absolute dimention with ex:[100px]

const Banner = () => {

  return (
    <div className="relative mx-auto w-11/12 h-[300px] sm:h-[400px] lg:h-[500px] xl-h[600px] 2xl:h-[700px]">
      <Image
        src="https://cdn.pixabay.com/photo/2016/11/19/14/30/aurora-borealis-1839582_1280.jpg"
        layout="fill"
        objectFit="cover"
        className="rounded-2xl"
        alt=""
      />
      <div className="absolute top-1/4 md:top-1/3 lg:top-1/2 w-full text-center">
        <p className="text-white text-sm sm:text-lg">Not sure where to go? Perfect.</p>
        <button className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">I&apos;m flexible</button>
      </div>
    </div>
  )
}

export default Banner