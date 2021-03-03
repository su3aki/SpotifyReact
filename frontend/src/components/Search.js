import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useAudio from './UseAudio'
import './Search.css'
import { Button } from '@material-ui/core'

const Search = (props) => {
  // const [searchResult, setSearchResult] = useState({
  //   trackId: "",
  //   artistsName: "",
  //   nameList: []
  // })
  const [itemResult, setItemResult] = useState([])
  const [selectedTrack, setSelectedTrack] = useState({
    trackURL: ""
  })
  useEffect(() => {
    //曲名単語検索
    axios(`https://api.spotify.com/v1/search?query=${props.wordFormData}&type=track&market=US&limit=10`, {
      method: "GET",
      headers: { Authorization: "Bearer " + props.token },
    })
      .then((trackContentsResponse) => {
        // const tracksFilter = trackContentsResponse.data.tracks.items
        setItemResult(trackContentsResponse.data.tracks.items)
        console.log("🔻トラック検索結果：" + props.wordFormData)
        console.log(trackContentsResponse)
      })
      .catch((err) => {
        console.log("err:", err)
      })
  }, [props.wordFormData, props.token]
  )
  console.log(itemResult)
  itemResult.length === 0
    ? console.log("未取得")
    : console.log(itemResult[0].album.images[0].url)
  const audioURL = "https://p.scdn.co/mp3-preview/660f6707ddb0b91c3bd1deaac2585292e546634e?cid=d20198343b174396815682bbc04c4973"
  //オーディオのカスタムフック
  const [playing, play, pause,] = useAudio(audioURL);
  return (
    <div>
    <div className="tracks-header">
        <p>Tracklist</p>
    </div>

    <Button onClick={playing ? pause : play}>
      {playing ? "Pause" : "Play"}
    </Button>
    <div className="tracks">
      { itemResult !== undefined
        ? itemResult.length === 0
          ? <p>そんな曲ないわ</p>
          : <ul>
            {itemResult.map((props) =>
              <li
                onClick
                key={props.id}>
                <img src={props.album.images[1].url} />
                  <div className="tracks-info">
                    {props.name}<br/>
                    {props.album.artists[0].name}
                </div>
              </li>
            )}
          </ul>
        : <p>wait a minute</p>
      }
      {/* {searchResult.nameList.map((name) =>
        <li>
          {name}
        </li>
      // <div key={id}>
      //   <p onClick={() => (<GetParams token={props.token} trackId={id} />)}/>
      //   {name}        // </div>
      )}
      </ul>
      <h3>Artist is called "{searchResult.artistsName}"</h3>
      <p>ResultID: {searchResult.trackId}</p>
      <GetParams token={props.token} trackId={searchResult.trackId} />
       */}
      </div>
      </div>
  )
}
export default Search;
