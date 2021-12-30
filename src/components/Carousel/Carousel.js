import React,{useState, useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {API_KEY, API_URL, IMAGE_BASE_URL, IMAGE_SIZE } from '../config';
import './carousel.css'
import noPicture from '../Images/noPicture.png'

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({movieId}) => {
    const [credits, setCredits] = useState([]);

    const items = credits.map((c) => (
      <div className="carouselItem">
        <img
          src={c.profile_path
            ? `${IMAGE_BASE_URL}${IMAGE_SIZE}${c.profile_path}`
            : noPicture}
          alt={c?.name}
          onDragStart={handleDragStart}
          className="carouselItem__img"
        />
        <b className="carouselItem__txt">{c?.name}</b>
      </div>
    ));
  
    const responsive = {
      0: {
        items: 3,
      },
      512: {
        items: 4,
      },
      1024: {
        items: 6,
      },
    };
    const fetchData = async ()=>{
        const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        const creditsResult = await (await fetch(creditsEndpoint)).json();
        console.log(creditsResult)
        setCredits(creditsResult.cast);
    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
      }, []);
  return (
    <AliceCarousel 
        mouseTracking items={items}
        infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      // eslint-disable-next-line
      items={items}
      autoPlay />
  );
}

export default Carousel