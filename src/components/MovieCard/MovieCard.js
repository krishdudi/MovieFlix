import React from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import './card.css'
import ContentModal from "../ContentModal/ContentModal";
const MovieCard = ({ image, movieId, clickable, title, rating, count }) => {
  
  return (
    <ContentModal movieId={movieId}>
          <img className="ima" src={image} alt="x"/>
          <h5 className="movie-title">{title}</h5>
    </ContentModal>
  );
};
MovieCard.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number
}

export default MovieCard;
