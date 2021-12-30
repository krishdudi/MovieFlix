import React, { useState, useEffect, useRef } from "react";
import MovieCard from "../MovieCard/MovieCard";
import SearchBar from "../Searchbar/SearchBar";
import { POPULAR_BASE_URL, SEARCH_BASE_URL,IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import Spinner from "../Spinner/Spinner";
import "./home.css";
import noImage from '../Images/noImage.jpeg';
import { useHomeFetch } from "../useHomeFetch";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchTermRef = useRef(searchTerm);
  const [
    {
      state: { movies },
      loading,
      error,
      currentPageRef,
      loadingRef,
      totalPagesRef,
    },
    fetchMovies,
  ] = useHomeFetch(searchTerm);
  // eslint-disable-next-line
  const useMountEffect = (func) => useEffect(func, []);

  useMountEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  });

  const handleWindowScroll = () => {
    const endOfPage =
      Math.round(window.innerHeight + document.documentElement.scrollTop) ===
      Math.round(document.scrollingElement.scrollHeight);

    if (
      endOfPage &&
      currentPageRef.current < totalPagesRef.current &&
      !loadingRef.current
    ) {
      loadMoreMovies();
    }
  };

  const searchMovies = (search) => {
    const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;

    setSearchTerm(search);
    searchTermRef.current = search;
    fetchMovies(endpoint);
  };

  const loadMoreMovies = () => {
    const searchEndpoint = `${SEARCH_BASE_URL}${searchTermRef.current}&page=${
      currentPageRef.current + 1
    }`;
    const popularEndpoint = `${POPULAR_BASE_URL}&page=${
      currentPageRef.current + 1
    }`;

    const endpoint = searchTermRef.current ? searchEndpoint : popularEndpoint;

    fetchMovies(endpoint);
  };

  if (error)
    return (
      <div
        style={{
          color: "red",
          fontSize: 35,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {" "}
        NETWORK ERROR, Please try after some time 😥
      </div>
    );

  if (!movies[0]) return <Spinner/>

  return (
    <div className="container">
      <SearchBar callback={searchMovies}/>
      <h1>{searchTerm ? "Search Result" : "Popular Movies "}</h1>
      <div className="popular">
      {movies.map((movie) => (
          <div className="element"><MovieCard
          title={movie.title}
          rating={movie.vote_average}
          count={movie.vote_count}
          key={movie.id}
          clickable
          image={ movie.poster_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
            : noImage}
          movieId={movie.id}
          movieName={movie.original_title}
        /></div>
          
        ))}
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default Home;
