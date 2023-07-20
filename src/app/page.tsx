"use client";

import { useEffect, useState } from "react";
import { EnvVariables } from "@/types/EnvVariables";
import { Movie } from "@/types/Movies";
import CardFilm from "@/components/CardFilm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// const URL_TRAILER = process.env.URL_TRAILER || "";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
const URL_BASE = process.env.NEXT_PUBLIC_URL_BASE || "";
const URL_DATA = `${URL_BASE}now_playing?${API_KEY}&language=pt-BR&page=1`;



// Assim deve ser a url pra buscar informacoes sobre o trailer do filme, descobrir uma forma de colocalo num player
// https://api.themoviedb.org/3/movie/678512/videos?api_key=74c1852101385c9f79e7ba929e418a7e&language=pt-BR

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>();

  const [videoUrl, setVideoUrl] = useState("");

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  function handleOpenTrailer(
    videUrl: string,
    selectedMovie: Movie,
    runtime: number,
    genresString: string
  ) {
    setVideoUrl(videUrl);
    setSelectedMovie({ ...selectedMovie, runtime, genresString });
  }

  // console.log(selectedMovie?.runtime)

  async function getData() {
    try {
      const res = await fetch(URL_DATA);

      const moviesData = await res.json();
      setMovies(moviesData.results);
    } catch (error) {
      console.log("Erro ao obter os dados dos filmes: ", error);
    }
  }

  // url pra pegar o vídeo do trailer
  // `${URL_TRAILER}${movie.id}/videos?${apiKey}&append_to_response=videos&language=pt-BR`

  useEffect(() => {
    getData();
  }, []);

  // console.log(movies);

  return (
    <main className="max-w-screen-lg mx-auto">
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="font-bold text-4xl uppercase">Filmes em Cartaz</h1>
        <p className="font-semibold text-lg text-slate-500">
          Os melhores filmes você encontra aqui
        </p>
      </div>

      <div>
        <Swiper
          className=" h-[430px]"
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={5}
          slidesPerView={3}
          breakpoints={{
            480: { slidesPerView: 2 },
            740: { slidesPerView: 3 },
            1275: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}>
          {movies &&
            movies.map((movie) => (
              <SwiperSlide
                className="!flex justify-center items-center"
                key={movie.id}>
                <CardFilm movie={movie} onVideoObtained={handleOpenTrailer} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Fazer aqui uma div que apareça o trailer do filme, sua sinopse e duração do filme, colocando um botão que direciona para uma página de compra do ingresso, que pode ser implementada depois */}

      <div className="py-4 flex gap-4">
        <div>
          <iframe
            className="hover:rounded-lg duration-500"
            width="560"
            height="315"
            src={videoUrl}
            title="Trailer do Filme"
            allowFullScreen
          />
        </div>

        <div className="text-justify ">
          {selectedMovie && (
            <>
              <h2 className="font-semibold text-gray-800 text-lg ">
                {selectedMovie.title}
              </h2>
              <p>
                <span className="font-semibold">Gêneros:</span>{" "}
                {selectedMovie.genresString}
              </p>
              <p> {selectedMovie.overview}</p>
              <p>
                <span className="font-semibold">Duração:</span>{" "}
                {selectedMovie.runtime} minutos
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
