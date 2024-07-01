import React from 'react';

const HeroCard = ({ hero: { id, name, image, alignment, publisher } }) => {
  return (
    <div className="hero" key={id}>
      <div>
        <p>{alignment}</p>
      </div>

      <div>
        <img src={image !== "N/A" ? image : "https://via.placeholder.com/400"} alt={name} />
      </div>

      <div>
        <span>{publisher}</span>
        <h3>{name}</h3>
      </div>
    </div>
  );
}

export default HeroCard;