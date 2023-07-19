/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.themoviedb.org"],
  },
  env: {
    API_KEY: "api_key=74c1852101385c9f79e7ba929e418a7e",
    URL_BASE: "https://api.themoviedb.org/3/movie/",
    URL_TRAILER: "https://api.themoviedb.org/3/movie/",
    IMAGE_URL: "https://www.themoviedb.org/t/p/w220_and_h330_face",

  },
};

module.exports = nextConfig;
