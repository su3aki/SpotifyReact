import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = (props) => {
  //const [trackInfo, setTrackInfo] = useState("")
  //アクセストークン取得
  const [searchResult, setSearchResult] = useState([])
  useEffect(() => {
//曲名単語検索
    axios(`https://api.spotify.com/v1/search?query=${props.wordFormData}&type=track&market=US&limit=10`, {
      method: "GET",
      headers: { Authorization: "Bearer " + props.token },
    })
      .then((trackContentsResponse) => {
        setSearchResult(
          [trackContentsResponse.data.tracks.items.album]
        )
        console.log(trackContentsResponse)
      })
      .catch((err) => {
        console.log("err:", err)
      })
  }, [props.wordFormData]
  )
  return (
    <div>
      <p>RESULT:{searchResult}</p>
    </div>
  )
}
export default Search;
