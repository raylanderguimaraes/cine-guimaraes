"use client";
import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types/Movies";
import { useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
const URL_BASE = process.env.NEXT_PUBLIC_URL_BASE || "";
const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "";

interface CardFilmProps {
  movie: Movie;
  onVideoObtained: (
    videoUrl: string,
    selectedMovie: Movie,
    runtime: number,
    genresString: string
  ) => void;
}

interface TempGenre {
  name: string;
}

export default function CardFilm({ movie, onVideoObtained }: CardFilmProps) {
  const [videoUrl, setVideoUrl] = useState("");

  async function handleOpenTrailer() {
    try {
      const movieTrailer = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?${API_KEY}&append_to_response=videos&language=pt-BR`
      );
      const data = await movieTrailer.json();
      const videoKey = data.videos.results?.[0]?.key || "";
      const videoUrl = `https://youtube.com/embed/${videoKey}`;
      const runtime = data.runtime || 0;
      const genres: TempGenre[] = data.genres.map(
        (genre: TempGenre) => genre.name
      );
      const genresString = genres.join(", ");
      setVideoUrl(videoUrl);
      onVideoObtained(videoUrl, movie, runtime, genresString);

      // console.log(data);
      // console.log(runtime);
      // console.log(genresString)
    } catch (error) {
      console.log("Erro ao trazer o video do filme", error);
    }
  }

  // console.log(videoUrl);

  return (
    <div className="flex flex-col w-[220px]">
      <button onClick={handleOpenTrailer}>
        {" "}
        <Image
          className="rounded-lg"
          src={`${IMAGE_URL}${movie.poster_path}`}
          width={220}
          height={330}
          alt={movie.title}
          priority
        />
      </button>

      <div className="h-9 text-center font-semibold text-slate-500">
        <p>{movie.title}</p>
      </div>
    </div>
  );
}
