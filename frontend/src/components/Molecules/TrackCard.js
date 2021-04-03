import React from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {ReactComponent as Logo } from '../Atoms/SpotifyLogo.svg'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

const TrackCard = React.memo((props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      backgroundColor: "#1e1022",
      color: "#ff87d6",
      padding: 0,
      height: 100
    },
    content: {
      width: 'calc(100% - 160px)',
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      padding: 10

    },
    cover: {
      width: 100,
      height: 100
    },
    trackAndArtist: {
      width: 'calc(100% - 100px)',
    }
    ,
    link: {
      paddingTop: -10
    },
    playButton: {
      width: 40,
      height: 'auto',
      alignItems: 'center',
    },
  }));
  //再生ボタンの条件分岐に使用　デフォルトでは緑のPlay
  let ButtonLooks = false

  //Search.jsにあるReactHowlerの再生管理
  //この階層に再生エンジンを置くと再生機構を複数持つ為同時再生されてしまう
  const handleStartPlaying = () => {
    props.setPlaying(true)
  }
  const handleStopPlaying = () => {
    props.setPlaying(false)
  }
  //音楽が再生されている場合
  //Search.js再生エンジンにURLを載せ替える
  const handleMountUrl = () => {
    props.setPlaySrc(props.previewUrl)
  }
  //音楽が再生されていない場合
  //再生指令をエンジンに送りURLをマウント
  const handlePlayAndMount = () => {
    handleStartPlaying();
    handleMountUrl();
  }
  const handlePlayButton = () =>
    {
      props.playing
        ? handleMountUrl()
        : handlePlayAndMount()
  }
  //マウントされた曲とカードの持つプレビュー曲が同じであれば停止ボタン表示
  if ((props.previewUrl) === (props.playSrc)) {
    ButtonLooks = true
  }
  const classes = useStyles();
  const theme = useTheme()
  return (
    <div>
      <Card className={classes.root} elevation={2}>
        {props.previewUrl !== undefined
          ? <CardMedia onClick={() => { handlePlayButton() }}
            className={classes.cover}
            image={props.artworkUrl} />
          : <CardMedia
            className={classes.cover}
            image={props.artworkUrl} />}
        <CardContent className={classes.content}>
          <div className={classes.trackAndArtist}>
            <Typography component="h6" variant="h6" onClick={() => { window.open(props.spotifyUrl) }}>
              {props.trackName}
            </Typography>
          <Typography variant="subtitle1" style={{ color: "#d0d1ff"}}>
            {props.artistName}
          </Typography>
          </div>
          {/* <Logo onClick={() => { window.open(props.spotifyUrl) }}/> */}
          </CardContent>
            {props.previewUrl !== 0
              && props.previewUrl !== null
              ?<>{ButtonLooks
                ? <PauseCircleOutlineIcon className={classes.playButton} style={{ color: "#ff006e", fontSize: 40 }}
                onClick={() => { handleStopPlaying() }} />
                : <PlayCircleOutlineIcon className={classes.playButton} style={{ color: "#1db954",fontSize: 40 }}
                onClick={() => { handlePlayButton() }} />
              }
                </>
                : <NotInterestedIcon className={classes.playButton} style={{ color: "#7f7f7f", fontSize:40 }}/>
              }
        </Card>
        </div>
  );
})
export default TrackCard;
