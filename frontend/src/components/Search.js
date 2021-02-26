import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import GetParams from './GetParams'


const Search = (props) => {
  // const [searchResult, setSearchResult] = useState({
  //   trackId: "",
  //   artistsName: "",
  //   nameList: []
  // })
  const [itemResult,setItemResult] = useState([])
  console.log(itemResult)
  useEffect(() => {
//曲名単語検索
    axios(`https://api.spotify.com/v1/search?query=${props.wordFormData}&type=track&market=US&limit=10`, {
      method: "GET",
      headers: { Authorization: "Bearer " + props.token },
    })
      .then((trackContentsResponse) => {
        // const tracksFilter = trackContentsResponse.data.tracks.items
        setItemResult(trackContentsResponse.data.tracks)
        // setSearchResult({
        //   nameList: tracksFilter[0],
        //   trackId: tracksFilter[0].id,
        //   artistsName: tracksFilter[0].artists[0].name,
        // })
        console.log("🔻トラック検索結果：" + props.wordFormData)
        console.log(trackContentsResponse)
      })
      .catch((err) => {
        console.log("err:", err)
      })
  }, [props.wordFormData,props.token]
  )
  const items = itemResult.items
  console.log(items)
  return (
    <div>
      <ul>
      {items.map((props,index) =>
        <li key={index}>
          {props.name}
        </li>
      )}
      </ul>
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
  )
}
export default Search;
