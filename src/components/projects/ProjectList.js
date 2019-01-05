import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'
import Notifications from '../dashboard/Notifications'


const ProjectList = ({projects,auth,...props}) => {
  return (
    <div className="project-list section">
      <Notifications notifications={props.notifications}/>
      { projects && projects.map(project => {
        return (
          <Link to={'/project/' + project.id} className="card z-depth-0" key={project.id}>
            <ProjectSummary auth={auth} project={project} />
          </Link>
        )
      })}  
    </div>
  )
}

export default ProjectList
