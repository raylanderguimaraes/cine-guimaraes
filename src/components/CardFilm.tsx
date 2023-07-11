import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types/Movies";

interface CardFilmeProps {
  movie: Movie;
  imageUrl: string;
}

export default function CardFilm({ movie, imageUrl }: CardFilmeProps) {
  return (
    <li key={movie.id}>
      <Link href="#">
        <div className="flex flex-col w-[220px] h-[400px] text-slate-700  justify-between items-center">
          <Image
            className="rounded-lg"
            src={`${imageUrl}${movie.poster_path}`}
            width={220}
            height={500}
            alt={movie.title}
          />
          <h2>{movie.title}</h2>
          <p>Classificacao</p>
        </div>
      </Link>
    </li>
  );
}
