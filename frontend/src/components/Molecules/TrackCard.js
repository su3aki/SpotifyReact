import React, { useState } from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PlayButton from 'react-play-button'

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
	const [play, { stop, isPlaying }] = useState(props.previewUrl)
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
							?<Typography>
								再生不可
							</Typography>
							: <PlayButton
								active={isPlaying}
								iconColor="var(--color-background)"
                idleBackgroundColor="var(--color-text)"
								activeBackgroundColor="var(--color-primary)"
								url={props.previewUrl}
                play={play}
                stop={stop}/>
						}
          </CardContent>
				</div>
				</Card>
				</div>
  );
}
export default TrackCard;
