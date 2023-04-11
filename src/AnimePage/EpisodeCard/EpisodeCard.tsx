import { Episode } from "../../Interface/AnimeInfo";
import "../EpisodeCard/EpisodeCard.css";

interface EpisodeCardProps {
  key: string;
  ep: Episode;
  onClick: () => void;
}

function EpisodeCard(props: EpisodeCardProps) {
  return (
    <div className="episode" onClick={props.onClick}>
      <h5>EP{props.ep.number}</h5>
    </div>
  );
}

export default EpisodeCard;
