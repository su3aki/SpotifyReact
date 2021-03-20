import React from 'react'
import './MMplayer.sass'

const MMplayer = () => {

	return (
<div className="wrap">
  <div className="player paused">
    <div className="progress-bar">
      <div className="runner"></div>
    </div>
    <div className="album-art">
      <div className="cover"></div>
    </div>
    <div className="description">
      <div className="title">Something from nothing  </div>
      <div className="sub-title">by Foo Fighters, Sonic highways</div>
    </div>

    <div className="time-indicator">
      <i className="mdi mdi-clock"></i>
      <span className="time">03:39</span>
    </div>
  </div>

</div>
	)
}
export default MMplayer;
