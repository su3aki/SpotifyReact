import React, { useState } from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {ReactComponent as Logo } from '../Atoms/SpotifyLogo.svg'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

const TrackCard = (props) => {
  const [buttonLooks, setButtonLooks] = useState(false)
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      backgroundColor: "#1e1022",
      color: "#ff87d6",
      padding: 0,
      height: 130
    },
    details: {
      width: 'calc(100% - 150px)',
      height: 130,
        "&:last-child": {
          height: 80
        }
    },
    content: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      paddingLeft: 10,
        "&:last-child": {
          padding: 10
        }
      },
      cover: {
        width: 130,
        height: 130
      },
      link: {
        paddingTop: -10
      },
      playButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      subtitle: {
        color: "#a699a2",
      },
    }
  ));
  const trackUrl = (props.previewUrl)
  const handleStartPlaying = () => {
    props.setPlaying(true)
  }
  const handleStopPlaying = () => {
    setButtonLooks(false)
    props.setPlaying(false)
  }
  //音楽が再生されている場合
  //Search.js再生エンジンにURLを載せ替える
  const handleMountUrl = () => {
    setButtonLooks(true)
    props.setPlaySrc(trackUrl)
  }
  //音楽が再生されていない場合
  //再生指令をエンジンに送りURLをマウント
  const handlePlayAndMount = () => {
    setButtonLooks(false);
    handleStartPlaying();
    handleMountUrl();
  }
  // 音楽が再生されていない場合
  const handlePlayButton = () =>
    {
      props.playing
        ? handleMountUrl()
        : handlePlayAndMount()
  }
  const classes = useStyles();
  const theme = useTheme()
  return (
    <div>
      <Card className={classes.root} elevation={2}>
        <CardMedia onClick={() => { handlePlayButton() }}
          className={classes.cover}
          image={props.artworkUrl}/>
        <div className={classes.details} >
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6">
              {props.trackName}
            </Typography>
            <div className={classes.subtitle}>
              <div className={classes.spotifyButton}>
            </div>
          <Typography variant="subtitle1">
            {props.artistName}
              </Typography>
            </div>
            <div className={classes.playButton}>
            <Logo onClick={() => { window.open(props.spotifyUrl) }}/>
            {props.previewUrl !== 0
              && props.previewUrl !== null
              ?<>{buttonLooks
                  ? <PauseCircleOutlineIcon style={{ color: "#ff006e",fontSize: 40 }}
                    onClick={() => { handleStopPlaying() }} />
                  : <PlayCircleOutlineIcon style={{ color: "#1db954",fontSize: 40 }}
                    onClick={() => { handlePlayButton() }} />
                }
                </>
                : <NotInterestedIcon style={{ color: "#7f7f7f", fontSize:40 }}/>
              }</div>
          </CardContent>
        </div>
        </Card>
        </div>
  );
}
export default TrackCard;
