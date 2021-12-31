import Head from 'next/head'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className="">
      <Head>
        <title>Walison Airbnb</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </div>
  )
}

export default Home
