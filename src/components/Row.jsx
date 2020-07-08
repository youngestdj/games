import React, { useState, useEffect } from "react";

const Row = (props) => {
  const {
    homeTeamName,
    awayTeamName,
    status,
    score: { home, away },
  } = props;

  return (
    <>
      <div className="row">
        <span>{homeTeamName}</span>
        <span>{awayTeamName}</span>
        <span>{status}</span>
        <span>{home}</span>
        <span>{away}</span>
      </div>
    </>
  );
};

export default Row;
