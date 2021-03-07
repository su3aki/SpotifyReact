import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@material-ui/core/Box'
import './Search.css'
import GetParams from './GetParams'

const Search = (props) => {
  const [itemResult, setItemResult] = useState([])
  const [selectedTrack, setSelectedTrack] = useState({
    trackURL: "",
    trackId: ""
  })
  const token = props.token
  useEffect(() => {
    //曲名単語検索
    axios(`https://api.spotify.com/v1/search?query=${props.wordFormData}&type=track&market=US&limit=10`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    })
      .then((trackContentsResponse) => {
        setItemResult(trackContentsResponse.data.tracks.items)
        console.log("🔻トラック検索結果：" + props.wordFormData)
        console.log(trackContentsResponse)
      })
      .catch((err) => {
        console.log("err:", err)
      })
  }, [props.wordFormData, token]
  )
  console.log(itemResult)
  itemResult.length === 0
    ? console.log("未取得")
    : console.log(itemResult[0].album.images[0].url)

  const passData = () => (
    <GetParams token={token} id={props.id} />
  )

  return (
    <div>
    <div className="tracks-header">
        <p>Tracklist</p>
    </div>
    <div className="tracks">
      { itemResult !== undefined
        ? itemResult.length === 0
          ? <p>そんな曲ないわ</p>
          : <ul>
            {itemResult.map((props) =>
              <li key={props.id}>
                <img src={props.album.images[1].url} />
                <Box component="div" textOverflow="ellipsis" overflow="hidden" className="tracks-info"
                  onClick={() =>
                    <GetParams token={token} id={props.id} />}>
                    {props.name}<br/>
                    {props.album.artists[0].name}
                </Box>
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
