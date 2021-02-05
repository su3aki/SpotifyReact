import React from 'react'
import axios from 'axios'

const addFormData = ({ event, setToken }) => {
    event.preventDefault()
    console.log('clickd', event.target)
    axios(`https://api.spotify.com/v1/artists/${FormData}`, {
        method: "GET",
        headers: { 'Authorization': "Bearer " + setToken},
      }).then((artistsResponse) => {
        setArtists({
          artistsName: artistsResponse.data.name,
          artistsId: artistsResponse.data.id,
        })
      })
    setFormData('')
  }


export default addFormData;
