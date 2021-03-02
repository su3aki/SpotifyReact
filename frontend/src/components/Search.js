import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GetParams from './GetParams'
import './Search.css'

const Search = (props) => {
  // const [searchResult, setSearchResult] = useState({
  //   trackId: "",
  //   artistsName: "",
  //   nameList: []
  // })
  const [itemResult, setItemResult] = useState([])
  useEffect(() => {
    //曲名単語検索
    axios(`https://api.spotify.com/v1/search?query=${props.wordFormData}&type=track&market=US&limit=10`, {
      method: "GET",
      headers: { Authorization: "Bearer " + props.token },
    })
      .then((trackContentsResponse) => {
        // const tracksFilter = trackContentsResponse.data.tracks.items
        setItemResult(trackContentsResponse.data.tracks.items)
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
  }, [props.wordFormData, props.token]
  )
  console.log(itemResult)
  itemResult.length === 0
    ? console.log("未取得")
    : console.log(itemResult[0].album.images[0].url)
  return (
    <div className="tracks">
      { itemResult !== undefined
        ? itemResult.length === 0
          ? <p>そんな曲ないわ</p>
          : <ul>
            {itemResult.map((props) =>
              <li onClick={() => (<GetParams token={props.token} trackId={props.id} />)} key={props.id}>
                <img src={props.album.images[1].url} />
                {props.name}
              </li>
            )}
          </ul>
        : <p>wait a minute</p>
      }
      {/* { itemResult !== undefined
        ? <img src={itemResult[0].album.images[3].url} />
        : <p></p>
      } */}
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
