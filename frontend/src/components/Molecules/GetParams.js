import {React, useState, useEffect } from 'react'
import axios from 'axios'

const GetParams = (props) => {
  const [trackParams, setTrackParams] = useState([])
  useEffect(() => {
//Searchで拾ってきたIDを元に曲のパラメータを取得
    axios(`https://api.spotify.com/v1/audio-analysis/${props.id}`, {
      method: "GET",
      headers: {Authorization: "Bearer " + props.token}
    })
      .then((trackParameterResponse) => {
        setTrackParams({ trackParameterResponse })
        console.log("🔻トラック詳細情報")
        console.log(trackParameterResponse)
      })
      .catch((err) => {
        console.log("err", err)
      })
  }, [props.id,props.token]
  )
  return (
    <div>
      <p>Parameter:{ trackParams }</p>
    </div>
  )
}
export default GetParams;
