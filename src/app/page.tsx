import { EnvVariables } from "@/types/EnvVariables";
import { Movie } from "@/types/Movies";
import CardFilm from "@/components/CardFilm";

const env: EnvVariables = {
  apiKey: process.env.API_KEY || "",
  URL_BASE: process.env.URL_BASE || "",
  IMAGE_URL: process.env.IMAGE_URL || "",
};

const apiKey = env.apiKey;
const URL_BASE = env.URL_BASE;
const IMAGE_URL = env.IMAGE_URL;
async function getData() {
  try {
    const res = await fetch(`${URL_BASE}${apiKey}&language=pt-BR&page=1`);
    return res.json();
  } catch (error) {
    console.log("Algo deu errado na requisição", error);
  }
}

export default async function Home() {
  const data = await getData();

  const movies: Movie[] = data.results;

  return (
    <main className="max-w-screen-lg mx-auto">
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="font-bold text-4xl">FILMES EM CARTAZ</h1>
        <p className="font-semibold text-lg">
          Os melhores filmes você encontra aqui
        </p>
      </div>
      <div className="flex flex-col">
        <div className="">
          {/* Fazer aqui um carrossel, nesse carrossel eu preciso da capa do filme, título e classificação, separar essa informação num card, que pode ser criado como component, mais dois botões que mudam os filmes pra esquerda e direita. */}
          <ul className="w-full flex flex-wrap gap-4 items-center justify-center pb-4">
            {movies.map((movie) => (
              <CardFilm key={movie.id} movie={movie} imageUrl={IMAGE_URL} />
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          {/*Ao clicar nesse card, fazer carregar numa div abaixo um player do trailer se possível, a sinopse do filme clicado, demais informacoes do filme, sala e horários disponíveis com botão "comprar" que leva para a tela de comra do ingresso*/}
          <div className="w-[50%]">
            <h2>Player do filme??</h2>
          </div>
          <div>
            <h2>Título do filme</h2>
            <span>Classificação do Filme</span>
            <p>Sinpose do filme</p>
          </div>
        </div>
      </div>
    </main>
  );
}
