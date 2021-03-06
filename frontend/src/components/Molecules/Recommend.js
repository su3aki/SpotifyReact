import React, { useEffect } from 'react'
import axios from 'axios'

const Recommend = (props) => {
  useEffect(() => {
    //曲IDからトラックパラメータ取得
    axios(`https://api.spotify.com/v1/recommendations?limit=5&seed_artists=${props.artistId}&seed_genres=${props.genres}&seed_tracks=${props.trackId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + props.token,
        Accept: "application/json",
        "Content-type": "application/json"}
    }).then((recommendResponse) => {
			props.setLookRecommend(recommendResponse.data.tracks)
			console.log(recommendResponse.data)
		})
    .catch((err) => {
        console.log("err:", err)
      })
  }, [props.trackId])
  return (
    <div>
      { props.setLookRecommend }
    </div>
  )
}
export default Recommend;
