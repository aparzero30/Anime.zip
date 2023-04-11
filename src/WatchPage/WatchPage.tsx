import { useLocation, useNavigate } from "react-router-dom";
import { AnimeInfo, Episode } from "../Interface/AnimeInfo";
import { useEffect, useState } from "react";
import { GetAnimes } from "../Services/GetAnime";
import { Sources, StreamResults } from "../Interface/Stream";
import ReactPlayer from "react-player";
import "../WatchPage/WatchPage.css";
import EpisodeCard from "../AnimePage/EpisodeCard/EpisodeCard";

function WatchPage() {
  const navigate = useNavigate();
  const getAnime = new GetAnimes();
  const location = useLocation();
  const episode: Episode = location.state;
  // const [server, setServer] = useState("vidcloud");
  const [server, setServer] = useState("Vidstreaming");
  const [url, setUrl] = useState("");
  const [vidQuality, setVidQuality] = useState<Sources[]>([]);
  const [prevButton, setPrevButton] = useState<JSX.Element | null>(null);
  const [nextButton, setNextButton] = useState<JSX.Element | null>(null);
  var currentEpId: String = "";
  const [index, setIndex] = useState(0);
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

  const id = new URLSearchParams(location.search).get("id");
  const number = new URLSearchParams(location.search).get("number");
  const infoId = new URLSearchParams(location.search).get("animeId");
  const size = new URLSearchParams(location.search).get("size");
  var episodeIndex: number;
  var episodeSize: number;
  if (number) {
    episodeIndex = parseInt(number) - 1;
  }

  if (size) {
    episodeSize = parseInt(size) - 1;
  }

  function next() {
    episodeIndex += 1;
    watch(anime.episodes[episodeIndex]);
  }
  function prev() {
    watch(anime.episodes[index - 1]);
  }

  function watch(ep: Episode) {
    const episodeId = ep.id;
    currentEpId = episodeId;

    episodeIndex = anime.episodes.findIndex((ep) => ep.id === currentEpId);
    setIndex(episodeIndex);

    if (episodeIndex > 0) {
      setPrevButton(<div onClick={prev}>PREV</div>);
    } else {
      setPrevButton(null);
    }
    if (episodeIndex === anime.episodes.length - 1) {
      setNextButton(null);
    } else {
      setNextButton(<div onClick={next}>NEXT</div>);
    }

    async function fetchData() {
      const data = await getAnime.getStreamLinks(ep.id, server);
      setUrl(
        "https://m3u8-theta.vercel.app/cors?url=" +
          data.sources[0].url +
          "&origin=aninin"
      );
      setVidQuality(data.sources);
      navigate(
        `/stream?id=${ep.id}&number=${ep.number}&animeId=${infoId}&size=${anime.totalEpisodes}`
      );
    }
    fetchData();
  }

  useEffect(() => {
    var animex: String = "";
    if (infoId) {
      animex = infoId;

      async function fetchData() {
        const data = await getAnime.getAnimeInfo(animex);
        setAnime(data);
      }
      fetchData();
    }

    var episodeId: String = "";
    if (id) {
      episodeId = id;
      currentEpId = episodeId;

      async function fetchData() {
        const data = await getAnime.getStreamLinks(episodeId, server);
        setUrl(
          "https://m3u8-theta.vercel.app/cors?url=" +
            data.sources[0].url +
            "&origin=aninin"
        );
        setVidQuality(data.sources);
      }
      fetchData();
    }

    if (number) {
      setIndex(episodeIndex);
    }

    if (episodeIndex > 0) {
      setPrevButton(<div onClick={prev}>PREV</div>);
    } else {
      setPrevButton(null);
    }

    if (episodeIndex === episodeSize || episodeSize === -1) {
      setNextButton(null);
    } else {
      setNextButton(<div onClick={next}>NEXT</div>);
    }
  }, [anime]);

  function changeQuality(source: Sources) {
    setUrl(
      "https://m3u8-theta.vercel.app/cors?url=" + source.url + "&origin=aninin"
    );
  }

  return (
    <div className="video-wrapper">
      <div className="video-section">
        <h2>
          {anime.title.toUpperCase()} EPISODE {number}
        </h2>
        <div className="video-container">
          <ReactPlayer
            className="react-player"
            id="player"
            url={url}
            playing
            controls
            config={{
              file: {
                forceHLS: true,
              },
            }}
          />
        </div>
        <div className="video-settings">
          <select
            onChange={(e) => {
              const selectedQuality = e.target.value;
              const selectedSource = vidQuality.find(
                (source) => source.quality === selectedQuality
              );
              if (selectedSource) {
                changeQuality(selectedSource);
              }
            }}
          >
            {[...vidQuality].reverse().map((source) => (
              <option key={source.quality} value={source.quality}>
                {source.quality.toUpperCase()}
              </option>
            ))}
          </select>
          {prevButton}
          {nextButton}
        </div>
      </div>

      <div className="watch-episodes">
        {[...anime.episodes].reverse().map((ep: Episode) => (
          <EpisodeCard key={ep.id} ep={ep} onClick={() => watch(ep)} />
        ))}
      </div>
    </div>
  );
}

export default WatchPage;
