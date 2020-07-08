import React, { useState, useEffect } from "react";

const Game = (props) => {
  const {
    match: { data },
  } = props;
  const [gameData, setGameData] = useState(false);

  const getGames = async () => {
    const URL = data;
    try {
      const fetchResult = fetch(
        new Request(URL, { method: "GET", cache: "force-cache" })
      );
      const response = await fetchResult;
      const jsonData = await response.json();
      return setGameData(jsonData.data);
    } catch (error) {
      return setErrors([error]);
    }
  };
};

export default Game;
