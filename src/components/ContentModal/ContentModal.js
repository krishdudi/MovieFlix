import * as React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Spinner from "../Spinner/Spinner";
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE, API_KEY, API_URL } from "../config";
import './contentmodal.css';
import Carousel from "../Carousel/Carousel";

const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: "90%",
      height: "80%",
      backgroundColor: "#262626",
      border: "1px solid #282c34",
      borderRadius: 10,
      color: "white",
      boxShadow: "0px 0px 150px -45px rgba(255, 51, 0, 0.5)",
    //   padding: theme.spacing(1, 1, 3),
    },
  }));

export default function ContentModal({ children, movieId }) {
    const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [movie, setMovie] = useState({});
  const [director, setDirector] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const func = async () => {
      setError(false);
      setLoading(true);
    try {
        const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        const result = await (await fetch(endpoint)).json();
  
        const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        const creditsResult = await (await fetch(creditsEndpoint)).json();
  
        const directors = creditsResult.crew.filter(
          (member) => member.job === "Director"
        );
        console.log(error)
          console.log(result);
        setMovie(result);
        setDirector(directors);


      } catch (error) {
        setError(true);
      }
      setLoading(false);
  };

  useEffect(() => {
    func();
    // eslint-disable-next-line
  }, []);
  if(loading) return(<Spinner/>)
  return (
    <div>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="movie_card" >
            <div className="info_section">
              <div className="movie_header">
                <img
                  className="locandina"
                  src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
                  alt="No ige"
                />
                <h1 className="title-movie">{movie.title}</h1>
                <div className="directors">{director.map((dir)=>(
                    <h4>{dir.name}</h4>
                ))}
                </div>
                <div className="run-rating">
                    <div className="minutes">{movie.runtime} min</div>
                    <div className="score">{movie.vote_average}</div>
                </div>
                
              </div>
              <div className="movie_desc">
                  <div className="desc">Description</div>
                <p className="text">{movie.overview}</p>
              </div>
              <div className="actors">
                <div className="desc">Cast</div>
                <Carousel movieId={movieId}/>
              </div>
            </div>
            <div
              className="blur_back bright_back"
              style={{
                backgroundImage: `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')`,
              }}
            ></div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
