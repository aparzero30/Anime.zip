import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="LandingPage">
      <h1>ANIME.zip</h1>

      <Link to={"anime"}>
        <div id="watch">WATCH</div>
      </Link>
    </div>
  );
}

export default LandingPage;
