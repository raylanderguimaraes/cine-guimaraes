import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types/Movies";

interface CardFilmeProps {
    movie: Movie;
    imageUrl: string;
}

export default function CardFilm({movie, imageUrl}: CardFilmeProps) {
  return (
    <li key={movie.id}>
      <Link href="#">
        <div>
          <Image
            className="rounded-lg"
            src={`${imageUrl}${movie.poster_path}`}
            width={220}
            height={500}
            alt={movie.title}
          />
        </div>
      </Link>
    </li>
  );
}
