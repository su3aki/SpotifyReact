import React, { useState, useEffect } from 'react';
import axios from "axios";

const App = () => {
  const [token, setToken] = useState("")
  const [artists, setArtists] = useState({ artistsName: "", artistsgenres: "" })
  const [FormData, setFormData] = useState("")
  //form中身の変更内容取得
  const handleFormChange = (event) => {
    console.log(event.target.value)
    setFormData(event.target.value)
  }
  //アクセストークン取得
  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization':
        "Basic " + btoa(process.env.REACT_APP_clientId + ":" + process.env.REACT_APP_clientSecret)
      },
      data: "grant_type=client_credentials",
      method: "POST"
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token)
      console.log(tokenResponse.data.access_token)
    })
  }, [])
  //検索ボタンの機能
  //Formに入力されたIDを元にアーティスト名を取得
  const addFormData = (event) => {
    event.preventDefault()
    console.log('clickd', event.target)
    axios(`https://api.spotify.com/v1/artists/${FormData}`, {
      method: "GET",
      headers: { 'Authorization': "Bearer " + token },
    }).then((artistsResponse) => {
      setArtists({
        artistsName: artistsResponse.data.name,
        artistsgenres: artistsResponse.data.genres
      })
    })
    setFormData('')
  }
    return (
      <div>
        <h2>{artists.artistsName}</h2>
        <h2>{artists.artistsgenres}</h2>
        <form onSubmit={addFormData}>
          <input
            value={FormData}
            onChange={handleFormChange}
          />
          <button type="submit">検索</button>
        </form>
      </div>
    )
  }
export default App;
