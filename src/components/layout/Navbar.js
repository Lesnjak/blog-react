import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import {resetFilter} from '../../store/actions/projectActions'

const Navbar = (props) => {
  const { auth, profile, resetFilter} = props;
  // console.log(auth);
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <div className="row">
            <div className="col s3">
                <Link to='/' onClick={resetFilter} className="brand-logo left">Blog</Link>
            </div>
            <div className="col s9">
                {links}
            </div>
        </div>



      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}
const mapDispatchToProps = {
    resetFilter
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
