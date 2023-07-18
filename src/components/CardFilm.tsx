"use client";
import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types/Movies";



const IMAGE_URL = process.env.IMAGE_URL;

export default function CardFilm({ movie }: { movie: Movie }) {
  return (
    <div className="flex flex-col w-[220px]">
      <Link href="#">
        <Image
          className="rounded-lg"
          src={`${IMAGE_URL}${movie.poster_path}`}
          width={220}
          height={330}
          alt={movie.title}
          priority
        />
      </Link>
      <div className="h-9 text-center font-semibold text-slate-500">
        <p>{movie.title}</p>
      </div>
    </div>
  );
}
