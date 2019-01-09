import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import {resetFilter} from '../../store/actions/projectActions'

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <li onClick={props.resetFilter}><NavLink to='/create'>New Project</NavLink></li>
        <li onClick={props.resetFilter}><NavLink to={'/'} onClick={props.signOut}>Log Out</NavLink></li>
        <li><NavLink to='/' className="btn btn-floating red lighten-2">
          {props.profile.initials}
        </NavLink></li>
      </ul>
    </div>
  )
}

const mapDispatchToProps ={
    signOut,
    resetFilter
}


export default connect(null, mapDispatchToProps)(SignedInLinks)
