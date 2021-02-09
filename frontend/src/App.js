import React, { useState, useEffect } from 'react'
import axios from "axios"
import Button from '@material-ui/core/Button'
import SplitButton from './components/SplitButton'
import TextField from '@material-ui/core/TextField'

const App = () => {
  const [token, setToken] = useState("")
  const [artists, setArtists] = useState({ artistsJsonData: "", artistsName: "", artistsGenres: "",artistsPopularity: "" })
  const [IdFormData, setIdFormData] = useState("")
  const [SearchFormData, setSearchFormData] = useState("")
  //アクセストークン取得
  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization':
        "Basic " + btoa(process.env.REACT_APP_clientId + ":" + process.env.REACT_APP_clientSecret)
      },
      data: "grant_type=client_credentials"
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token)
      console.log(
        "アクセストークン："
        + tokenResponse.data.access_token)
    })
  }, [])
  //ID検索ボタンの機能
  //IDFormに入力されたIDを元にアーティスト名を取得
  const addIdFormData = (event) => {
    event.preventDefault()
    console.log('RUN ID Fetch', event.target)
    axios(`https://api.spotify.com/v1/artists/${IdFormData}`, {
      method: "GET",
      headers: {
        'Authorization': "Bearer " + token
      }
    }).then((artistsResponse) => {
      setArtists({
        artistsName: artistsResponse.data.name,
        artistsGenres: artistsResponse.data.genres,
        artistsPopularity: artistsResponse.data.popularity
      })
    })
    setIdFormData('')
  }
  //Idform中身の変更内容取得
  const handleFormChange = (event) => {
    console.log(event.target.value)
    setIdFormData(event.target.value)
  }
  //単語検索ボタンの機能
  //SearchFormに入力された単語を元にアーティスト名を取得
  const addSearchFormData = (event) => {
    event.preventDefault()
    console.log('RUN WORD Search', event.target)
    axios(`https://api.spotify.com/v1/search?q=${SearchFormData}&type=artist&limit=3`, {
      method: "GET",
      headers: {
        'Authorization': "Bearer " + token
      },
    }).then((artistsResponse) => {
      console.log(artistsResponse.data)
      //検索結果を変数に登録
      setArtists({
        //未解決2/9現在
        artistsJsonData: artistsResponse.data.[artists]
      })
      console.log(artists.artistsJsonData)
    })
    setSearchFormData('')
  }
  //Searchform中身の変更内容取得
  const handleSearchFormChange = (event) => {
    console.log(event.target.value)
    setSearchFormData(event.target.value)
  }
  return (
    <div>
      <h1>ID検索</h1>
      <form onSubmit={addIdFormData}>
        <input
          value={ IdFormData }
          onChange={handleFormChange}
          />
        <Button variant="contained" color="primary" type="submit">GO!</Button>
      </form>
      <h2>アーティスト名：{ artists.artistsName }</h2>
      <h2>ジャンル：{ artists.artistsGenres }</h2>
      <h2>人気パラメータ：{ artists.artistsPopularity }</h2>
      <h1>アーティスト名検索</h1>
      <form onSubmit={ addSearchFormData }>
        <input
          value={ SearchFormData }
          onChange={ handleSearchFormChange }
        />
        <Button variant="contained" color="primary" type="submit">GO!</Button>
      </form>
      <h2>クソ長い検索結果：{[artists.artistsJsonData]}</h2>
      <SplitButton />
      <TextField
          id="standard-full-width"
          label="ID検索"
          style={{ margin: 8 }}
          placeholder="入力せい"
          helperText="かっこよさそうやから入れた"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
    </div>
    )
  }
export default App;
