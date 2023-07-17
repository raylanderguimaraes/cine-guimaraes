/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.themoviedb.org"],
  },
  env: {
    apiKey: "api_key=74c1852101385c9f79e7ba929e418a7e",
    BASE_URL: "https://api.themoviedb.org/3/movie/now_playing?",
    IMAGE_URL: "https://www.themoviedb.org/t/p/w220_and_h330_face",
  },
};

module.exports = nextConfig;
