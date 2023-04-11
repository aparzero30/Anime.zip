import "../MainPage/MainPage.css";
import AnimeCard from "../MainPage/AnimeCard/AnimeCard";
import { AnimeResults } from "../Interface/AnimeResults";
import { Anime } from "../Interface/AnimeResults";
import { GetAnimes } from "../Services/GetAnime";
import { useState, useEffect } from "react";
import AnimeHeader from "./AnimeHeader/AnimeHeader";
import { useNavigate } from "react-router-dom";
import { AnimeInfo } from "../Interface/AnimeInfo";

function MainPage() {
  const getAnime = new GetAnimes();
  const navigate = useNavigate();

  const [animeData, setAnimeData] = useState<AnimeResults | null>(null);

  const [searchData, setSearchData] = useState<AnimeResults | null>(null);
  const [searchOn, setSearch] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getAnime.getRecent();
      setAnimeData(data);
    }
    fetchData();
  }, []);

  if (!animeData) {
    return <div>Loading...</div>;
  }

  function getAnimeInfo(anime: Anime) {
    navigate(`/info?id=${anime.id}`);
  }

  function searchAnime(key: String) {
    async function fetchData() {
      const data = await getAnime.searchAnime(key);
      setSearchData(data);
      if (searchData != null) {
        setSearch(true);
        console.log(searchData);
      } else {
        setSearch(false);
      }
      if (key == "") {
        setSearch(false);
      }
    }
    fetchData();
  }

  return (
    <div className="main-page-wrapper">
      <AnimeHeader onSearch={searchAnime} />
      <div className="anime-body">
        <div className="my-list"></div>
        <div className="card-wrapper">
          <h5>LATEST EPISODES</h5>
          {searchOn
            ? searchData?.results.map((anime: Anime) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  onClick={() => getAnimeInfo(anime)}
                />
              ))
            : animeData?.results.map((anime: Anime) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  onClick={() => getAnimeInfo(anime)}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
