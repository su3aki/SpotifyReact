import React, { useState } from 'react'
import TrackParams from '../Molecules/TrackParams'
import TrackCard from '../Molecules/TrackCard'
import QueryTracks from "../Molecules/QueryTracks"
import Box from '@material-ui/core/Box'
import './Search.css'
import { Typography } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const Search = (props) => {
  const [itemResult, setItemResult] = useState([])
  const [trackInfo, setTrackInfo] = useState("")
  const [selectedTrack, setSelectedTrack] = useState({
    trackId: "",
    trackName: "",
    trackArtist: "",
  })
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
//trackParamsは曲の分析結果
//trackInfoは曲のアーティスト情報など
  console.log(selectedTrack.trackId)
  console.log(trackInfo)
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography variant="h6">TrackList</Typography>
        <div className="tracks">
          <TrackParams token={token}
            id={selectedTrack.trackId}
            trackName={selectedTrack.trackName}
            trackArtist={selectedTrack.trackArtist}
            setTrackInfo={setTrackInfo} />
          <QueryTracks token={token}
            wordFormData={wordFormData}
            setItemResult={setItemResult} />
          <TrackCard></TrackCard>
          {trackInfo !== undefined
            ? trackInfo.length === 0
            ? <p>パラメータが存在しません</p>
            : "Loudness" + trackInfo.data.loudness
            :<p>曲を選んでください</p>
          }
          {itemResult !== undefined
            ? itemResult.length === 0
            ? <p>そんな曲ないわ</p>
            : <ul>
                {itemResult.map((props) =>
                  <li
                    key={props.id}
                    onClick={() => setSelectedTrack({
                      trackId: props.id,
                      trackName: props.name,
                      trackArtist: props.artists[0].name
                    })}>
                      <TrackCard
                      albumUrl={props.album.images[1].url}
                      trackName={props.name}
                      artistName={props.album.artists[0].name}></TrackCard>
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
