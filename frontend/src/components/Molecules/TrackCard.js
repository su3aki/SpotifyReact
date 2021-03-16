import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const TrackCard = (props) => {

	const useStyles = makeStyles((theme) => ({
		root: {
			display: "flex",
		},
		details: {
			width: 'calc(100% - 120px)',
			flexWrap: "nowrap",
			textOverflow: "ellipsis",
			overflow: "hidden"
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
	}));

	const classes = useStyles();
	const theme = useTheme()
	return (
		<div>
			<Card className={classes.root}
				elevation={2}>
						<CardMedia
							className={classes.cover}
							image={props.albumUrl}
					title="Live from space album cover"
							/>
      <div className={classes.details}>
					<CardContent className={classes.content}
					>
          <Typography component="h6" variant="h6">
            {props.trackName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.artistName}
          </Typography>
        </CardContent>
      </div>
				</Card>
				</div>
  );
}
export default TrackCard;
