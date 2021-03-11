import React, { useState } from 'react'
import Credentials from '../Molecules/Credentials'
import Header from '../Organisms/Header'
import Search from '../Organisms/Search'
import {
  makeStyles
} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import './Top.css'
import Typography from '@material-ui/core/Typography'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

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
  const customFont = "'Economica', 'Sawarabi Mincho', sans-serif"

  const theme = createMuiTheme({
    typography: {
      fontFamily: customFont,
    }
  })
  const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    },
  margin: {
    margin: theme.spacing(1),
  },
}));

  const classes = useStyles()
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
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
            color="secondary"
            onChange={(e) => setWordFormData(e.target.value)}
            />
        </form>
        {wordFormData.length === 0
            ?
            <Typography>
              Fill The Form
            </Typography>
          : <Search token={token} wordFormData={wordFormData} />
        }
        </ThemeProvider>
        </div>
    )
  }
export default Top;
