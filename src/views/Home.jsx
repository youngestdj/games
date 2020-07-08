/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [games, setGames] = useState(false);
  const [date, setDate] = useState({
    d: null,
    m: null,
    y: null,
  });
  const [errors, setErrors] = useState(false);

  const updateInput = (event) => {
    setDate({
      ...date,
      [event.target.name]: event.target.value,
    });
  };

  // const validateInput = () => {
  //   if()
  // }

  const getGames = async (d, m, y) => {
    const URL = `http://gd2.mlb.com/components/game/mlb/year_${y}/month_${m}/day_${d}/master_scoreboard.json`;
    try {
      const fetchResult = fetch(
        new Request(URL, { method: "GET", cache: "force-cache" })
      );
      const response = await fetchResult;

      const jsonData = await response.json();
      if (!jsonData.data.games.game) {
        return setErrors(["No games available."]);
      }
      if (
        jsonData.data.games.game &&
        !Array.isArray(jsonData.data.games.game)
      ) {
        return setGames([jsonData.data.games.game]);
      }

      return setGames(jsonData.data.games.game);
    } catch (error) {
      return setErrors([error]);
    }
  };

  const completeRequest = async (event) => {
    setErrors(null);
    event.preventDefault();
    if (!date.d || !date.m || !date.y)
      return setErrors(["Please enter a valid date"]);
    await getGames(date.d, date.m, date.y);
    return;
  };

  // useEffect(() => {
  //   const bla = async () => {
  //     await getGames().then((res) => {
  //       setGames(res.data.games.game);
  //     });
  //   };
  //   bla();
  // }, []);
  console.log(games);

  return (
    <>
      <div className="container">
        <div>
          {errors && errors.map((error) => <div key={error}>{error}</div>)}
          <form>
            <input
              type="number"
              min="01"
              max="31"
              placeholder="day"
              name="d"
              onChange={updateInput}
            />
            <input
              type="number"
              min="01"
              max="12"
              placeholder="month"
              name="m"
              onChange={updateInput}
            />
            <input
              type="number"
              min="1000"
              max="2030"
              placeholder="year"
              name="y"
              onChange={updateInput}
            />
            <input type="submit" value="View games" onClick={completeRequest} />
          </form>
        </div>
        {games && games.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Home team</th>
                <th>Away team</th>
                <th>Status</th>
                <th>Score (home)</th>
                <th>Score (away)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.id}>
                  <td>{game.home_team_name}</td>
                  <td>{game.away_team_name}</td>
                  <td>{game.status.status}</td>
                  <td>{game.linescore.r.home}</td>
                  <td>{game.linescore.r.away}</td>
                  <td>
                    <Link to={`/game/${game.game_data_directory}/boxscore.json`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Home;
