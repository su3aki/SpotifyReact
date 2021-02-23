import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = (props) => {
  //const [trackInfo, setTrackInfo] = useState("")
  //アクセストークン取得
  const [searchResult, setSearchResult] = useState({
    artistName: "",
    artistId: "",
    trackPreviewURL: "",
    trackImg: "",
    trackName: "",
  })
  useEffect(() => {
//曲名単語検索
      axios(`https://api.spotify.com/v1/search?q=${props.wordFormData}&type=track&market=US&limit=10&offset=5`, {
        method: "GET",
        headers: { Authorization: "Bearer " + props.token },
      })
        .then((trackContentsReaponse) => {
          setSearchResult({
            artistName: trackContentsReaponse.data.artists[0].name,
            artistId: trackContentsReaponse.data.artists[0].id,
            trackPreviewURL: trackContentsReaponse.data.preview_url,
            trackImg: trackContentsReaponse.data.album.images[0].url,
            trackName: trackContentsReaponse.data.name,
          })
          .catch((err) => {
        console.log("err:", err);
      })
        })
  }, [props.wordFormData,props.token])
    return (
      <div>
        <p>RESULT:{searchResult.trackPreviewURL}</p>
      </div>
    )

}
export default Search;
