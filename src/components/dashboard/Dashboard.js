import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
// import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import SearchBar from '../layout/SearchBar'
import firebase from 'firebase';
import {blogFilter} from '../../store/actions/projectActions'




class Dashboard extends Component {


  render() {


    const { projects, auth, notifications,blogFilter } = this.props;


    

    // if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12">
              <SearchBar blogFilter={blogFilter} />
            <ProjectList auth={auth}  projects={projects} notifications={notifications}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
// console.log("---",state.project);

  return {
    projects:state.project[0]
        ? state.firestore.ordered.projects.filter(project=>project.title.toUpperCase().includes(state.project.toUpperCase()))
      :state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}
const mapDispatchToProps={
    blogFilter
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc']},
    { collection: 'notifications', limit: 4, orderBy: ['time', 'desc']}
  ])
)(Dashboard)
