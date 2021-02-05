import React from 'react';
import axios from 'axios';

const SearchArtist = (setToken) => {

  axios("https://api.spotify.com/v1/artists/4upiYMjsFfLRieGo8RVRzD", {
    method: "GET",
    headers: { 'Authorization': "Bearer" + setToken },
  }).then((artistsResponse) => {
    console.log(artistsResponse.data.name, artistsResponse.data.id)
  })
    }

export default SearchArtist;
