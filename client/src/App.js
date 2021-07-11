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


const useStyles = makeStyles((theme) => ({
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
  const [isplaying, setIsPlaying] = useState(false);
  const addToLoop = (audio, id) => {
    let selectedPad = document.querySelector(id);
    if (selectedPad.checked) {
      if (isplaying === true) {
        looper[0]?.addEventListener("ended", () => {
          looper.push(audio);
          play();
        },
          false
        );
      } else
        looper.push(audio);
    } else {
      looper = looper.filter(function (obj) {
        if (obj.src === audio.src) {
          obj.pause();
        }
        return obj.src !== audio.src;
      });

      if (looper.length === 0) {
        setIsPlaying(false);
        setLooper([]);

      }


    }
  };

  const play = () => {
    if (looper.length !== 0) {
      setIsPlaying(true);
      looper.forEach((sound) => {
        sound.play();
        sound.addEventListener("ended", () => {
          sound.play();
        },
          false
        );
      });
    }
  };
  const pause = () => {
    if (looper.length !== 0) {
      looper.forEach((sound) => {
        sound.pause();
      });
    }

  };

  const stop = () => {
    setIsPlaying(false);
    looper.forEach((sound) => {
      sound.pause();
      sound.removeEventListener("ended", () => {

      },
        false
      );
    });
    setLooper([]);
    document.querySelectorAll('input[type=checkbox]').forEach(pad => pad.checked = false);
  };

  const classes = useStyles();
  return (
    <>
      <Container className="container" maxWidth="s">
        <Jumbotron className="header">
          <h1 className="header__head" >Netta’s Loop Station</h1>

        </Jumbotron>
        <div className={classes.root}>
          <Grid container alignItems="center" justify="center" spacing={3}>
            <Grid item s>
              <label hidden={isplaying}>Break Beats</label>
              <input id='breakbeats' onClick={() => addToLoop(breakbeats, '#breakbeats')} type="checkbox" />
            </Grid>
            <Grid item s>
              <label hidden={isplaying}>electric Guitar</label>
              <input id='electricGuitar' onClick={() => addToLoop(electricGuitar, '#electricGuitar')} type="checkbox" />
            </Grid>
            <Grid item s>
              <label hidden={isplaying}>funk</label>
              <input id='funk' onClick={() => addToLoop(funk, '#funk')} type="checkbox" />
            </Grid>
            <Grid item s>
              <Grid item s>
                <Button className="button" onClick={() => play()}  ><PlayArrowRoundedIcon style={{ fontSize: '3rem' }} ></PlayArrowRoundedIcon></Button>
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
              <label hidden={isplaying}>organ</label>
              <input id='organ' onClick={() => addToLoop(organ, '#organ')} type="checkbox" />
            </Grid>
            <Grid item s>
              <Button className="button" onClick={() => pause()}  ><PauseCircleFilledRoundedIcon style={{ fontSize: '3rem' }}></PauseCircleFilledRoundedIcon></Button>
            </Grid>
          </Grid>
          <Grid container alignItems="center" justify="center" spacing={3}>
            <Grid item s>
              <label hidden={isplaying}>stompy</label>
              <input id='stompy' onClick={() => addToLoop(stompy, '#stompy')} type="checkbox" />
            </Grid>
            <Grid item s>
              <label hidden={isplaying}>Tanggu</label>
              <input id='tanggu' onClick={() => addToLoop(tanggu, '#tanggu')} type="checkbox" />
            </Grid>
            <Grid item s>
              <label hidden={isplaying}>heavy Funk</label>
              <input id='heavyFunk' onClick={() => addToLoop(heavyFunk, '#heavyFunk')} type="checkbox" />
            </Grid>
            <Grid item s>
              <Button className="button" onClick={() => stop()} ><StopRoundedIcon style={{ fontSize: '3rem' }}></StopRoundedIcon></Button>
            </Grid>
          </Grid>
        </div>
        <img hidden={!isplaying} src="https://cdn.dribbble.com/users/619527/screenshots/4531991/neta-900-1.gif" class="woot-dance" width="328" height="272" alt="8-bit" />
      </Container>
    </>
  );
}

export default App;
