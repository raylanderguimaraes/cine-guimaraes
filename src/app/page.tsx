"use client";

import { useEffect, useState } from "react";
import { EnvVariables } from "@/types/EnvVariables";
import { Movie } from "@/types/Movies";
import CardFilm from "@/components/CardFilm";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const env: EnvVariables = {
  apiKey: process.env.API_KEY || "",
  URL_BASE: process.env.URL_BASE || "",
  IMAGE_URL: process.env.IMAGE_URL || "",
};

const apiKey = env.apiKey;
const URL_BASE = env.URL_BASE;
const IMAGE_URL = env.IMAGE_URL;

export default async function Home() {
  async function getData() {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=74c1852101385c9f79e7ba929e418a7e&language=pt-BR&page=1`

      // Descobrir uma forma de colocar a URL utilizando as variáveis de ambiente
      // `${URL_BASE}${apiKey}&language=pt-BR&page=1`
    );

    const moviesData = await res.json();
    return moviesData.results;
  }

  const movies: Movie[] = await getData();

  return (
    <main className="max-w-screen-lg mx-auto">
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="font-bold text-4xl">FILMES EM CARTAZ</h1>
        <p className="font-semibold text-lg">
          Os melhores filmes você encontra aqui
        </p>
      </div>

      {/* Fazer aqui um carrossel, nesse carrossel eu preciso da capa do filme, título e classificação, separar essa informação num card, que pode ser criado como component, mais dois botões que mudam os filmes pra esquerda e direita. */}

      {/* Arrumar uma forma de colocar as informações abaixo de cada imagem do filme, no card, Titulo do filme e classificação */}

      <div>
        <Swiper
          className=" h-[430px]"
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            480: { slidesPerView: 2 },
            740: { slidesPerView: 3 },
            1275: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}>
          {movies.map((movie) => (
            <SwiperSlide
              className="!flex justify-center items-center"
              key={movie.id}>
              <CardFilm movie={movie} imageUrl={IMAGE_URL} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
}
