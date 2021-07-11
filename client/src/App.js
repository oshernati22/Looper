import React, { useState } from "react";
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Jumbotron } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import { Button } from '@material-ui/core';
import './App.scss';
import Breakbeats from "./tunes/breakbeats.mp3";
import Guitar from "./tunes/electric_guitar.mp3";
import Funk from "./tunes/funk.mp3";
import HeavyFunk from "./tunes/heavyFunk.mp3";
import MazePolitics from "./tunes/MazePolitics.mp3";
import PasGroove from "./tunes/PAS3GROOVE.mp3";
import Organ from "./tunes/SilentStar.mp3";
import Stomphy from "./tunes/StompySlosh.mp3";
import Tanggu from "./tunes/Tanggu.mp3";


const useStyles = makeStyles((theme) => ({ //define grid style
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(7),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));


const App = () => {
  //load mp3 files
  const breakbeats = new Audio(Breakbeats);
  const electricGuitar = new Audio(Guitar);
  const funk = new Audio(Funk);
  const heavyFunk = new Audio(HeavyFunk);
  const mazePolitics = new Audio(MazePolitics);
  const pasGroove = new Audio(PasGroove);
  const organ = new Audio(Organ);
  const stompy = new Audio(Stomphy);
  const tanggu = new Audio(Tanggu);
  let [looper, setLooper] = useState([]);
  const [isplaying, setIsPlaying] = useState(false); //  if looper is playing or not

  //handle pad pressed
  const addToLoop = (audio, id) => {
    let selectedPad = document.querySelector(id); //load the specific pressed pad 
    if (selectedPad.checked) { //check if the pad is still pressed
      if (isplaying === true) { //check if playing button is pressed
        looper[0]?.addEventListener("ended", () => { //check if theres audio in looper if true wait until the first audio will ended and add another song to the lopper and pressed the play button
          looper.push(audio);
          play();
        },
          false
        );
      } else
        looper.push(audio); //if the play button not pressed add to the looper and wait for play
    } else {
      looper = looper.filter(function (obj) { //if the pad unchecked pause the specific audio and remove from it the looper
        if (obj.src === audio.src) {
          obj.pause();
        }
        return obj.src !== audio.src;
      });

      if (looper.length === 0) { //if all the pads are unchecked clear the looper an unpressed the playing button
        setIsPlaying(false);
        setLooper([]);

      }


    }
  };

  const play = () => { //responsable to play the looper
    if (looper.length !== 0) {
      setIsPlaying(true); //if play button is predded
      looper.forEach((sound) => {  //play all the looper audio
        sound.play();
        sound.addEventListener("ended", () => {  // reapet the audio 
          sound.play();
        },
          false
        );
      });
    }
  };
  const pause = () => {  //pause all the audio in the looper
    if (looper.length !== 0) {
      looper.forEach((sound) => {
        sound.pause();
      });
    }

  };

  const stop = () => { //stop (clear) al the audio in the looper 
    setIsPlaying(false); //unpressed the playing button
    looper.forEach((sound) => { //pause all the audio
      sound.pause();
      sound.removeEventListener("ended", () => { //remove the reapeted audio in the looper

      },
        false
      );
    });
    setLooper([]); //clear the looper
    document.querySelectorAll('input[type=checkbox]').forEach(pad => pad.checked = false); //unchecked all the pressed pads
  };

  const classes = useStyles();
  return (
    <>
      <Container className="container" maxWidth="s">
        <Jumbotron className="header">
          <h1 className="header__head" >Netta’s Loop Station <img src="https://www.israeliamerican.org/sites/default/files/styles/circular-headshot/public/team-headshots/netta_0.jpg?itok=jmxmkzBV" width="75" height="75" alt="8-bit" /></h1>
        </Jumbotron>
        <div className={classes.root}>
          <Grid container alignItems="center" justify="center" spacing={3}>
            <Grid item s>
              <label hidden={isplaying}>Break Beats</label>
              <input id='breakbeats' onClick={() => addToLoop(breakbeats, '#breakbeats')} type="checkbox" /> {/*every input is a pad that if pressed it will add to the looper*/}
            </Grid>
            <Grid item s>
              <label hidden={isplaying}>electric Guitar</label>
              <input id='electricGuitar' onClick={() => addToLoop(electricGuitar, '#electricGuitar')} type="checkbox" />
            </Grid>
            <Grid item s>
              <label hidden={isplaying}>funki funk</label>
              <input id='funk' onClick={() => addToLoop(funk, '#funk')} type="checkbox" />
            </Grid>
            <Grid item s>
              <Grid item s>
                <Button className="button" onClick={() => play()}  ><PlayArrowRoundedIcon style={{ fontSize: '3rem' }} ></PlayArrowRoundedIcon></Button> {/*play button*/}
              </Grid>
            </Grid>
          </Grid>
          <Grid container alignItems="center" justify="center" spacing={3}>
            <Grid item s>
              <label hidden={isplaying}>Maze Politics</label>
              <input id='mazePolitics' onClick={() => addToLoop(mazePolitics, '#mazePolitics')} type="checkbox" />
            </Grid>
            <Grid item s>
              <label hidden={isplaying}>pas groov</label>
              <input id='pasGroove' onClick={() => addToLoop(pasGroove, '#pasGroove')} type="checkbox" />
            </Grid>
            <Grid item s>
              <label hidden={isplaying}> Silent Star </label>
              <input id='organ' onClick={() => addToLoop(organ, '#organ')} type="checkbox" />
            </Grid>
            <Grid item s>
              <Button className="button" onClick={() => pause()}  ><PauseCircleFilledRoundedIcon style={{ fontSize: '3rem' }}></PauseCircleFilledRoundedIcon></Button> {/*pause button*/}
            </Grid>
          </Grid>
          <Grid container alignItems="center" justify="center" spacing={3}>
            <Grid item s>
              <label hidden={isplaying}>stompy Slosh</label>
              <input id='stompy' onClick={() => addToLoop(stompy, '#stompy')} type="checkbox" />
            </Grid>
            <Grid item s>
              <label hidden={isplaying}>bambook tang </label>
              <input id='tanggu' onClick={() => addToLoop(tanggu, '#tanggu')} type="checkbox" />
            </Grid>
            <Grid item s>
              <label hidden={isplaying}>heavy Funk</label>
              <input id='heavyFunk' onClick={() => addToLoop(heavyFunk, '#heavyFunk')} type="checkbox" />
            </Grid>
            <Grid item s>
              <Button className="button" onClick={() => stop()} ><StopRoundedIcon style={{ fontSize: '3rem' }}></StopRoundedIcon></Button> {/*stop button*/}
            </Grid>
          </Grid>
        </div>
        <img hidden={!isplaying} src="https://cdn.dribbble.com/users/619527/screenshots/4531991/neta-900-1.gif" class="gif_dance" width="328" height="272" alt="8-bit" /> {/*netta gif will show just if the looper is playing*/}
      </Container>
    </>
  );
}

export default App;
