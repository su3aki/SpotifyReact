import React, { useEffect } from 'react'
import axios from 'axios'

const TrackData = (props) => {
  useEffect(() => {
    //曲IDからトラックパラメータ取得
    axios(`https://api.spotify.com/v1/audio-features/${props.id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + props.token,
        Accept: "application/json",
        "Content-type": "application/json"}
    }).then((trackInfoResponse) => {
      props.setTrackInfo(trackInfoResponse)
      console.log(trackInfoResponse)

    })
  }, [props.id])
  return (
    <div>
      { props.setTrackInfo}
    <p>hello</p>
    </div>
  )
}
export default TrackData;
