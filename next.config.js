// when using NextJS, IF IS A PUBLIC KEY, we can use a env variable next config. otherwise, we MUST use a .env file
// PRIVATE KEY NEVER COMES HERE.
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com'],
  },
  env: {
    MAPBOX_KEY: 'pk.eyJ1Ijoid3Rlb2Rvcm8iLCJhIjoiY2t5MzAyb3VwMDl2MzJ3dWl1bG4xb3F5eCJ9.wQ1SF50EAeEOG7QQduF2iA'
  }
}