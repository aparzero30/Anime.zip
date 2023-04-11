import axios from "axios";
import "../../src/index.css";

const baseUrl = "https://api.consumet.org/anime/gogoanime/";

export class GetAnimes {
  async searchAnime(keyWord: String) {
    const url = baseUrl + keyWord + "?page=1";
    try {
      const { data } = await axios.get(url, { params: { page: 1 } });
      return data;
    } catch (err) {
      throw new Error((err as Error).message); // use a type assertion to cast err to the Error type
    }
  }

  async getAnimeInfo(name: String) {
    const url = baseUrl + "info/" + name;
    // console.log(url);
    try {
      const { data } = await axios.get(url, { params: { id: name } });
      return data;
    } catch (err) {
      throw new Error((err as Error).message); // use a type assertion to cast err to the Error type
    }
  }

  async getStreamLinks(epId: String, server: String) {
    const url =
      "https://api.consumet.org/anime/gogoanime/watch/" +
      epId +
      "&server=" +
      server;
    console.log(url);
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      throw new Error((err as Error).message); // use a type assertion to cast err to the Error type
    }
  }

  async getRecent() {
    const url = baseUrl + "recent-episodes";
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      throw new Error((err as Error).message); // use a type assertion to cast err to the Error type
    }
  }

  async gago() {
    const url = "https://basic.trialaparzero.repl.co/video";
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      throw new Error((err as Error).message); // use a type assertion to cast err to the Error type
    }
  }
}
