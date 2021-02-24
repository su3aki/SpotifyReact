import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GetParams from './GetParams'
const Search = (props) => {
  const [searchResult, setSearchResult] = useState({
    trackId: "",
    artistsName: ""
  })
  useEffect(() => {
//曲名単語検索
    axios(`https://api.spotify.com/v1/search?query=${props.wordFormData}&type=track&market=US&limit=10`, {
      method: "GET",
      headers: { Authorization: "Bearer " + props.token },
    })
      .then((trackContentsResponse) => {
        setSearchResult({
          trackId: trackContentsResponse.data.tracks.items[0].id,
          artistsName: trackContentsResponse.data.tracks.items[0].artists[0].name
        })
        console.log(trackContentsResponse)
      })
      .catch((err) => {
        console.log("err:", err)
      })
  }, [props.wordFormData,props.token]
  )
  return (
    <div>
      <h3>Artist is called "{searchResult.artistsName}"</h3>
      <p>ResultID: {searchResult.trackId}</p>
      {/* <GetParams token={props.token} trackId={} /> */}
    </div>
  )
}
export default Search;
