import React, { useState } from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PlayButton from 'react-play-button'
import ReactHowler from 'react-howler'
import Button from "@material-ui/core/Button"

const TrackCard = (props) => {

	const [playing, setPlaying] = useState(false)
	const Volume = (props.volumeToggle)

	const handleOnPlay = () => {
    setPlaying(true)
	}
	const handleOnStop = () => {
		setPlaying(false)
	}
	const useStyles = makeStyles((theme) => ({
		root: {
			display: "flex",
			backgroundColor: "#1e1022",
			color: "#ff87d6",
			padding: 0
		},
		details: {
			width: 'calc(100% - 160px)',
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
			width: 150,
			height: 150
		},
		subtitle: {
			color: "#a699a2",
		}
	}));
	const classes = useStyles();
	const theme = useTheme()
	return (
		<div>
			<Card className={classes.root} elevation={2}>
				<CardMedia
					className={classes.cover}
					image={props.albumUrl}/>
        <div className={classes.details}>
					<CardContent className={classes.content}>
            <Typography component="h6" variant="h6">
              {props.trackName}
						</Typography>
						<div className={classes.subtitle}>
          <Typography variant="subtitle1">
            {props.artistName}
							</Typography>
						</div>
						{props.previewUrl !== 0
							&& props.previewUrl === null
							?
							<Typography>
								再生不可
							</Typography>
							: <div className={classes.statusButton}>
								<ReactHowler
								format="mp3"
								playing={playing}
								src={props.previewUrl}
								volume={Volume}
								/>
								<PlayButton
									src={props.previewUrl}
									onClick={() => setPlaying((state) => !state)}
									active={playing}
									play={handleOnPlay}
									stop={handleOnStop}
									size={30}
									progressCircleWidth={0}
									activeBackgroundColor="#1db954"
									idleBackgroundColor="#DF0869"
									stopIconColor= "#1e1022"
									playIconColor="#1e1022"
									progressCircleColor="#E9E3B4"
								/>
							</div>
							}
          </CardContent>
				</div>
				</Card>
				</div>
  );
}
export default TrackCard;
