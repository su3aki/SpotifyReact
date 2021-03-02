import React, { useState, useEffect } from 'react'
import axios from "axios"
import Search from './components/Search'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { color } from '@material-ui/system'
import './App.css'

const App = () => {
  const [token, setToken] = useState("")
  const [resultWordSearch, setResultWordSearch] = useState({
    artistsName: "",
    artistsImg: ""
  })
  const [wordFormData, setWordFormData] = useState("")
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (wordFormData === "") {
      alert("入力してください");
    }
  }
  //単語検索ボタンの機能
  //SearchFormに入力された単語を元にアーティスト名を取得
  const addSearchFormData = (event) => {
    setResultWordSearch([])
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
      setResultWordSearch({
        artistsName: artistsResponse.data.artists.items[0].name,
        artistsImg: artistsResponse.data.artists.items[0].images[0].url
      })
      console.log(artistsResponse.data)
    })
    setSearchFormData('')
  }
  //Searchform中身の変更内容取得
  const handleSearchFormChange = (event) => {
    console.log(event.target.value)
    setSearchFormData(event.target.value)
  }
  /*
  //アーティストのIDからアルバム取得
  const trackView = (id) => {
    axios(
      `https://api.spotify.com/v1/artists/${id}/albums?market=ES&limit=10`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        },
      }).then((tracksReaponse) => {
        setAlbums(tracksReaponse.data.items)
        console.log()
      })
  }
  */
//   const CssTextField = withStyles({
//   root: {
//     '& label.Mui-focused': {
//       color: 'green',
//     },
//     '& .MuiInput-underline:after': {
//       borderBottomColor: 'green',
//     },
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: 'red',
//       },
//       '&:hover fieldset': {
//         borderColor: 'yellow',
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: 'green',
//       },
//     },
//   },
// })(TextField);

  const useStyles = makeStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      color: 'green',
    },
  })
  const classes = useStyles
    return (
      <div className="App">
        <div className="App-header">
          <h1>Search Track by query</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField className={classes.root} id="standard-basic" fullWidth label="trackname?" value={wordFormData} onChange={(e) => setWordFormData(e.target.value)} />

        </form>
        {wordFormData.length === 0
          ? <p>Fill the form</p>
          : <Search token={token} wordFormData={wordFormData} />
          }
        <h1>Search Artists by query</h1>
          <form onSubmit={addSearchFormData}>
            <input
              value={SearchFormData}
              onChange={handleSearchFormChange}
            />
            <Button variant="contained" color="primary" type="submit">GO!</Button>
          </form>
          <p>Artists Result:{resultWordSearch.artistsName}</p>
          <img src={resultWordSearch.artistsImg}/>
        </div>

    )
  }
export default App;
