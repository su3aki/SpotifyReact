import React, { useState } from 'react'
import Credentials from '../Organisms/Credentials'
import Header from '../Organisms/Header'
import Search from '../Organisms/Search'
import {
  makeStyles
} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import './Top.css'

const Top = () => {
  const [token, setToken] = useState("")
  const [wordFormData, setWordFormData] = useState("")
  //アクセストークン取得
  const handleSubmit = (e) => {
    e.preventDefault();
    if (wordFormData === "") {
      alert("入力してください");
    }
  }
  const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    },
  margin: {
    margin: theme.spacing(1),
  },
}));

  const classes = useStyles()
    return (
      <div className="App">
        <Credentials setToken={ setToken }/>
        <Header/>
        <form className={classes.root} noValidate onSubmit={handleSubmit}>
          <TextField
            className={classes.margin}
            id="standard-basic"
            label="trackname?"
            value={wordFormData}
            fullWidth
            variant="filled"
            onChange={(e) => setWordFormData(e.target.value)}
            />
        </form>
        {wordFormData.length === 0
          ? <h2>Fill the form</h2>
          : <Search token={token} wordFormData={wordFormData} />
        }
        </div>
    )
  }
export default Top;
