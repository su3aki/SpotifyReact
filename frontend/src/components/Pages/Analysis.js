import React from 'react'
import Header from '../Organisms/Header'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const Analysis = () => {
  console.log("あならいしす")
  return (
    <div>
			<Header/>
			<p>アナライシスです</p>
			<Link to="/">
				<Button>Top</Button>
			</Link>
		</div>
	)
}
export default Analysis;
