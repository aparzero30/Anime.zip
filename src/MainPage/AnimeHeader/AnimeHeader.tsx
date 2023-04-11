import { useState } from "react";
import "../AnimeHeader/AnimeHeader.css";

interface AnimeHeaderProps {
  onSearch: (key: string) => void;
}

function AnimeHeader({ onSearch }: AnimeHeaderProps) {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    onSearch(event.target.value);
  }

  return (
    <div className="header-wrapper">
      <div className="search-wrapper">
        <input value={inputValue} onChange={handleInputChange} />

        <span className="material-symbols-outlined" id="searc-icon">
          search
        </span>
      </div>

      <div className="icon-wrapper">
        <span className="material-symbols-outlined">filter_alt</span>
        <span className="material-symbols-outlined">menu</span>
      </div>
    </div>
  );
}

export default AnimeHeader;
