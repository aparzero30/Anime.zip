import { AnimeInfo, Episode } from "../Interface/AnimeInfo";
import "./AnimePage.css";
import { useLocation, useNavigate } from "react-router-dom";
import EpisodeCard from "./EpisodeCard/EpisodeCard";
import { useState, useEffect } from "react";
import { GetAnimes } from "../Services/GetAnime";

function LandingPage() {
  const navigate = useNavigate();
  const getAnime = new GetAnimes();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  function watch(ep: Episode) {
    // navigate("/stream", { state: ep });
    navigate(
      `/stream?id=${ep.id}&number=${ep.number}&animeId=${id}&size=${anime.totalEpisodes}`
    );
  }

  const [anime, setAnime] = useState<AnimeInfo>({
    id: "",
    title: "",
    url: "",
    image: "",
    releaseDate: null,
    description: null,
    genres: [],
    subOrDub: "sub",
    type: null,
    status: "",
    otherName: null,
    totalEpisodes: 0,
    episodes: [],
  });

  // console.log(anime.episodes);

  useEffect(() => {
    // setAnime(location.state);

    var animeId: String = "";
    if (id) {
      animeId = id;

      async function fetchData() {
        const data = await getAnime.getAnimeInfo(animeId);
        setAnime(data);
        console.log(data);
      }
      fetchData();
    }
    console.log(id);
    console.log(animeId);
  }, []);

  return (
    <div className="AnimePage">
      <div className="about">
        <div
          className="img-banner"
          style={{ backgroundImage: `url(${anime.image})` }}
        ></div>
        <div className="txt-area">
          <h3 id="title">{anime.title.toUpperCase()}</h3>
          <p className="desc">{anime.description}</p>
          <p>GENRES: {anime.genres.join("/")}</p>
          <div className="actions">
            <span className="material-symbols-outlined">favorite</span>
            <span className="material-symbols-outlined">share</span>
          </div>
        </div>
      </div>
      <div className="ep-wrapper">
        {[...anime.episodes].reverse().map((ep: Episode) => (
          <EpisodeCard key={ep.id} ep={ep} onClick={() => watch(ep)} />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
