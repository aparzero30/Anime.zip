import { Anime } from "../../Interface/AnimeResults";
import "../AnimeCard/AnimeCard.css";

interface AnimeCardProps {
  key: string;
  anime: Anime;
  onClick: () => void;
}

function AnimeCard(props: AnimeCardProps) {
  return (
    <div
      className="card"
      style={{ backgroundImage: `url(${props.anime.image})` }}
      onClick={props.onClick}
    >
      <h4>{props.anime.title}</h4>
    </div>
  );
}

export default AnimeCard;
