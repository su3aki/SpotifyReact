import React, { useState } from 'react'
import ArtistParams from '../Molecules/ArtistParams'
import QueryTracks from "../Molecules/QueryTracks"
import Recommend from '../Molecules/Recommend'
import ReTrackParams from '../Molecules/ReTrackParams'
import ParamsGraph from '../Molecules/ParamsGraph'
import TrackCard from '../Molecules/TrackCard'
import TrackParams from '../Molecules/TrackParams'
import Trail from '../Atoms/Trail'
import { Button, Typography } from '@material-ui/core'
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
    trackArtistGenres: "",
    trackPopularity: ""
  })
  const [artistInfo, setArtistInfo] = useState("")
  const [lookRecommend, setLookRecommend] = useState([])
  const [selectedRecommend, setSelectedRecommend] = useState({
    reTrackId: "",
    reTrackName: "none",
    reTrackPopularity: "",
  })
  const [reTrackInfo, setReTrackInfo] = useState("")
  const [graphReDisplay, setGraphReDisplay] = useState("none")
  const [open, setTrail] = useState(true)
  const token = props.token
  const wordFormData = props.wordFormData

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
  }))
  const classes = useStyles()
  console.log(artistInfo.genres)
  //trackParamsは曲の分析結果　trackInfoに入る
  return (
    <div className={classes.root}>
      <div className="tracks">
        {/* 入力された単語から曲を検索 */}
        <QueryTracks token={token}
          wordFormData={wordFormData}
          setItemResult={setItemResult} />
        {/* 選ばれた曲のパラメータを取得 */}
        <TrackParams token={token}
          id={selectedTrack.trackId}
          trackName={selectedTrack.trackName}
          trackArtist={selectedTrack.trackArtist}
          setTrackInfo={setTrackInfo} />
        {/* 選ばれた曲のアーティスト情報を取得 */}
        {/* 発火条件：トラック選択完了後 */}
        { selectedTrack.length !== 0
          &&<ArtistParams token={token}
            artistId={selectedTrack.trackArtistId}
            setArtistInfo={setArtistInfo} />}
        {/* 選ばれた曲を元に類似曲を取得 */}
        {/* 発火条件：アーティスト情報取得後 */}
        {/* 注釈：ジャンル数が多いと検索に出ない為、3つまでしか取得しない */}
        { artistInfo.length !== 0
          &&<Recommend token={token}
            trackId={selectedTrack.trackId}
            artistId={selectedTrack.trackArtistId}
            artistGenres={(artistInfo.genres).slice(0,3)}
            setLookRecommend={setLookRecommend} />}
        {/* 選ばれた類似曲のパラメータ取得 */}
        <ReTrackParams token={token}
          id={selectedRecommend.reTrackId}
          setReTrackInfo={setReTrackInfo}/>
        {/* グラフコンポーネントへの値設定 */}
        <Grid container direction="row">
          <Grid item xs={12} sm={6} style={{ display: graphReDisplay}}>
          {trackInfo.data !== undefined
            && reTrackInfo.data !== undefined
              && <ParamsGraph
        // 検索結果で選んだ曲のパラメータをグラフに投入
            trackName={selectedTrack.trackName}
            FirstDanceAbility={trackInfo.data.danceability}
            FirstEnergy={trackInfo.data.energy}
            FirstLoudness={trackInfo.data.loudness}
            FirstPopularity={selectedTrack.trackPopularity}
            FirstTempo={trackInfo.data.tempo}
            FirstValence={trackInfo.data.valence}
        // サジェストで選んだ曲のパラメータをグラフに投入
            reTrackName={selectedRecommend.reTrackName}
            ReDanceAbility={reTrackInfo.data.danceability}
            ReEnergy={reTrackInfo.data.energy}
            ReLoudness={reTrackInfo.data.loudness}
            RePopularity={selectedTrack.trackPopularity}
            ReTempo={reTrackInfo.data.tempo}
            ReValence={reTrackInfo.data.valence}
            />
          }
        </Grid>
        <Grid item xs={12} sm={6} style={{ display: graphReDisplay}}>
        {lookRecommend !== undefined
          && (artistInfo.genres) !== undefined
              && <div className="recommend">
              <Typography component="h6" >
                {(artistInfo.genres).slice(0, 3).map(
                  (props, index) =>
                  <li key={index}>
                    <Button color="secondary">{props}</Button>
                  </li>)}
                のジャンルで{selectedTrack.trackName}に似ている曲がこちら
              </Typography>
              <ul>
              {lookRecommend.map((props) =>
                <li
                key={props.id}
                onClick={() => setSelectedRecommend({
                  reTrackId: props.id,
                  reTrackName: props.name,
                  reTrackPopularity: props.popularity
                })}>
                  <TrackCard
                    audioId={props.id}
                    artistName={props.album.artists[0].name}
                    albumUrl={props.album.images[1].url}
                    trackName={props.name}
                    previewUrl={props.preview_url}>
                  </TrackCard>
                </li>
              )}
            </ul></div>
        }
        </Grid>
        </Grid>
        <Button color="secondary" onClick={() => setTrail((state) => !state)}>トラックリスト</Button>
        <Button color="secondary" onClick={() => {setGraphReDisplay("block")}}>グラフ表示</Button>
        <Button color="secondary" onClick={() => {setGraphReDisplay("none")}}>グラフ非表示</Button>
        <Typography variant="h6">TrackList</Typography>
        {itemResult !== undefined
          && itemResult.length === 0
          ? <p>そんな曲ないわ</p>
          :
              <ul>
              {itemResult.map((props) =>
                <li
                  key={props.id}
                  onClick={() => setSelectedTrack({
                    trackId: props.id,
                    trackName: props.name,
                    trackArtistId: props.artists[0].id,
                    trackArtistName: props.artists[0].name,
                    trackPopularity: props.popularity
                  })}>
                    <Trail open={open}>
                    <TrackCard
                    audioId={props.id}
                    artistName={props.album.artists[0].name}
                    albumUrl={props.album.images[1].url}
                    trackName={props.name}
                    previewUrl={props.preview_url}>
                  </TrackCard>
              </Trail>
                </li>
              )}
            </ul>
        }
        </div>
        </div>
  )
}
export default Search;
