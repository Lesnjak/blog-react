import React from 'react'
import moment from 'moment'
import photo from '../../assets/no-photo.png';

const ProjectSummary = ({project,auth}) => {

    
  return (
      <div className="project-summary">
          <div className="card-image">
              <img src={ project.image ? project.image : photo  } className="card-img-top" alt="..."/>
          </div>
          <div className="card-content grey-text text-darken-3">
              <div className="box-button">
                  <span className="card-title ">{project.title}</span>
                  {auth && <button>
                      <i className="small material-icons">border_color</i>
                  </button>}


              </div>

              <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
              <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
          </div>
      </div>

  )
}

export default ProjectSummary
