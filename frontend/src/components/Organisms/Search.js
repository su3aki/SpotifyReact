import React, { useState } from 'react'
import TrackParams from '../Molecules/TrackParams'
import ReTrackParams from '../Molecules/ReTrackParams'
import TrackCard from '../Molecules/TrackCard'
import QueryTracks from "../Molecules/QueryTracks"
import ParamsGraph from '../Molecules/ParamsGraph'
import Recommend from '../Molecules/Recommend'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import './Search.css'

const Search = (props) => {
  const [itemResult, setItemResult] = useState([])
  const [trackInfo, setTrackInfo] = useState("")
  const [selectedTrack, setSelectedTrack] = useState({
    trackId: "",
    trackName: "",
    trackArtistName: "",
    trackArtistId: "",
    trackPopularity: ""
  })
  const [lookRecommend, setLookRecommend] = useState([])
  const [selectedRecommend, setSelectedRecommend] = useState({
    reTrackId: "",
    reTrackName: "",
    reTrackPopularity: "",
  })
  const [reTrackInfo, setReTrackInfo] = useState("")
  const token = props.token
  const wordFormData = props.wordFormData
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
  }))
  const classes = useStyles()
  //trackParamsは曲の分析結果　trackInfoに入る
  console.log(selectedTrack.trackId)
  console.log(trackInfo)
  console.log(reTrackInfo)
  return (
    <div className={classes.root}>
      <Typography variant="h6">TrackList</Typography>
    <div className="tracks">
        {/* 入力された単語から曲を検索 */}
        <QueryTracks token={token}
          wordFormData={wordFormData}
          setItemResult={setItemResult} />
        {/* 選ばれた曲のパラメータ取得 */}
        <TrackParams token={token}
          id={selectedTrack.trackId}
          trackName={selectedTrack.trackName}
          trackArtist={selectedTrack.trackArtist}
          setTrackInfo={setTrackInfo} />
        {/* 選ばれた曲から類似曲を取得 */}
        <Recommend token={token}
          trackId={selectedTrack.trackId}
          artistId={selectedTrack.trackArtistId}
          setLookRecommend={setLookRecommend}/>
        {/* 選ばれた類似曲のパラメータ取得 */}
        <ReTrackParams token={token}
          id={selectedRecommend.reTrackId}
          setReTrackInfo={setReTrackInfo} />
        {/* グラフコンポーネントへの値設定 */}
        <Grid container direction="row">
        <Grid item xs={12} sm={6}>
          {trackInfo.data !== undefined
            ? reTrackInfo.data !== undefined
            ?<ParamsGraph
            trackName={selectedTrack.trackName}
            FirstDanceAbility={trackInfo.data.danceability}
            FirstEnergy={trackInfo.data.energy}
            FirstLoudness={trackInfo.data.loudness}
            FirstPopularity={selectedTrack.trackPopularity}
            FirstTempo={trackInfo.data.tempo}
            FirstValence={trackInfo.data.valence}

            reTrackName={selectedRecommend.reTrackName}
            ReDanceAbility={reTrackInfo.data.danceability}
            ReEnergy={reTrackInfo.data.energy}
            ReLoudness={reTrackInfo.data.loudness}
            RePopularity={selectedTrack.trackPopularity}
            ReTempo={reTrackInfo.data.tempo}
            ReValence={reTrackInfo.data.valence}
            />
            : <p>reTrack undefinedエラー</p>
            : <p>undefinedエラー</p>
          }
          </Grid>
          <Grid xs={12} sm={6}>
        {lookRecommend !== undefined
          ? lookRecommend.length === 0
          ? <p>サジェストリストが出ます</p>
          : <ul>
              {lookRecommend.map((props) =>
                <li
                key={props.id}
                onClick={() => setSelectedRecommend({
                  reTrackId: props.id,
                  reTrackName: props.name,
                  reTrackPopularity: props.popularity
                })}>
                  <TrackCard
                    albumUrl={props.album.images[1].url}
                    trackName={props.name}
                    artistName={props.album.artists[0].name}></TrackCard>
                </li>
              )}
            </ul>
          :<p>ここにサジェストリストが現れます</p>
        }
        </Grid>
        </Grid>
        <p>検索結果</p>
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
                    trackArtistName: props.artists[0].name,
                    trackArtistId: props.artists[0].id,
                    trackPopularity: props.popularity
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
        </div>
  )
}
export default Search;
