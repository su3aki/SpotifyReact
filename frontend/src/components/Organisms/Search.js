import React, { useState } from 'react'
import TrackParams from '../Molecules/TrackParams'
import TrackCard from '../Molecules/TrackCard'
import QueryTracks from "../Molecules/QueryTracks"
import './Search.css'
import Grow from '@material-ui/core/Grow'
import { Typography } from '@material-ui/core'
import ParamsGraph from '../Molecules/ParamsGraph'

const Search = (props) => {
  const [itemResult, setItemResult] = useState([])
  const [trackInfo, setTrackInfo] = useState("")
  const [selectedTrack, setSelectedTrack] = useState({
    trackId: "",
    trackName: "",
    trackArtist: "",
    trackPopularity: ""
  })
  const token = props.token
  const wordFormData = props.wordFormData
//trackParamsは曲の分析結果
//trackInfoは曲のアーティスト情報など
  console.log(selectedTrack.trackId)
  console.log(trackInfo)

  return (
    <div>
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

          {trackInfo !== undefined
          ? trackInfo.length === 0
          ? <p>パラメータが存在しません</p>
          : <ParamsGraph
              trackName={selectedTrack.trackName}

              FirstDanceAbility={trackInfo.data.danceability}
              FirstEnergy={trackInfo.data.energy}
              FirstLoudness={trackInfo.data.loudness}
              FirstPopularity={selectedTrack.trackPopularity}
              FirstTempo={trackInfo.data.tempo}
              FirstValence={trackInfo.data.valence}
            />
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
                      trackArtist: props.artists[0].name,
                      trackPopularity: props.popularity
                    })}>
                    <Grow>
                      <TrackCard
                      albumUrl={props.album.images[1].url}
                      trackName={props.name}
                      artistName={props.album.artists[0].name}></TrackCard>
                    </Grow>
                  </li>
                )}
              </ul>
            : <p>wait a minute</p>
          }
      </div>
        </div>
  )
}
export default Search;
