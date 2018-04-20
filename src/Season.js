import React from "react";

const Season = ({ summary, number, image }) => (
  <div>
    <h2>{`Season ${number}`}</h2>
    {image && <img alt="season-cover" src={image.medium} />}
    <div dangerouslySetInnerHTML={{ __html: summary }} />
  </div>
);

export default Season;
