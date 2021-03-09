import React, { useState } from 'react'
import TrackData from '../Molecules/TrackData'
import QueryTracks from "../Molecules/QueryTracks"
import Box from '@material-ui/core/Box'
import './Search.css'
import { Typography } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const Search = (props) => {
  const [itemResult, setItemResult] = useState([])
  const [trackInfo, setTrackInfo] = useState("")
  const [trackId, setTrackId] = useState("")
  const token = props.token
  const wordFormData = props.wordFormData
  const theme = createMuiTheme();

  theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
  }

  // const selectedId = (e) => {
  //   e.preventDefault();
  //   return (
  //     itemResult[itemNumber].id
  //   )
  // }

  console.log(trackId)
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography variant="h6">TrackList</Typography>
        <div className="tracks">
          <TrackData token={token}
            id={trackId}
            setTrackInfo={setTrackInfo} />
          <QueryTracks token={token}
            wordFormData={wordFormData}
            setItemResult={setItemResult} />
          {trackInfo !== undefined
            ?<p>曲を選んでください</p>
            :{trackInfo}
      }
      { itemResult !== undefined
        ? itemResult.length === 0
        ? <p>そんな曲ないわ</p>
        : <ul>
            {itemResult.map((props) =>
              <li
                key={props.id}
                onClick={() => setTrackId(props.id)}>
                <img src={props.album.images[1].url} />
                <Box component="div" textOverflow="ellipsis" overflow="hidden" className="tracks-info" >
                    {props.name}<br/>
                    {props.album.artists[0].name}
                </Box>
              </li>
            )}
          </ul>
          : <p>wait a minute</p>
        }
      </div>
        </ThemeProvider>
        </div>
  )
}
export default Search;
