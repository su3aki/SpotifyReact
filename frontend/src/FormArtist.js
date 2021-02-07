import React from 'react'
import axios from 'axios'


/*
  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization':
          "Basic " + btoa(process.env.REACT_APP_clientId + ":" + process.env.REACT_APP_clientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      console.log(tokenResponse.data.access_token)
      setToken(tokenResponse.data.access_token)

    axios("https://api.spotify.com/v1/artists/64tJ2EAv1R6UaZqc4iOCyj", {
        method: "GET",
        headers: { 'Authorization': "Bearer " + tokenResponse.data.access_token },
      }).then((artistsResponse) => {
        setArtists({
          artistsName: artistsResponse.data.name,
          artistsId: artistsResponse.data.id,
        })
      })
    })
  }, [])
  */
export default addFormData;
