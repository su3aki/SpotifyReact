import React from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ReactAudioPlayer from "react-audio-player"

const TrackCard = (props) => {

	const useStyles = makeStyles((theme) => ({
		root: {
			display: "flex",
			backgroundColor: "#1e1022",
			color: "#ff87d6"
		},
		details: {
			width: 'calc(100% - 120px)',
		},
		content: {
			textOverflow: "ellipsis",
			overflow: "hidden",
			whiteSpace: "nowrap"
		},
		cover: {
			width: 100,
			height: 100
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
						{props.previewUrl === null
							? <Typography>
								再生不可
							</Typography>
								:<ReactAudioPlayer
							src={props.previewUrl}
							controls/>
						}
          </CardContent>
				</div>
				</Card>
				</div>
  );
}
export default TrackCard;
