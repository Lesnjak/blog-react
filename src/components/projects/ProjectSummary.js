import React from 'react'
import moment from 'moment'
import photo from '../../assets/no-photo.png'
import { Link } from 'react-router-dom'

const ProjectSummary = ({project,auth}) => {

  return (
      <div className="project-summary ">
          <Link to={'/project/' + project.id} className="card-image">
                  <img src={ project.image ? project.image : photo  } className="card-img-top" alt="..."/>
          </Link>

          <div className="card-content ">
              <div className="box-button">
                  <Link to={'/project/' + project.id} >
                      <span className="card-title hover-text hover">{project.title}</span>
                  </Link>

                  {project.authorId === auth.uid && <button >
                      <Link to={'/project/edit/' + project.id}  key={project.id}>
                          <i className="tiny material-icons hover-text hover">border_color</i>
                      </Link>
                  </button>}


              </div>


          </div>
          <div className="dark-box card-content grey lighten-5">
              <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
              <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
          </div>
      </div>

  )
}

export default ProjectSummary
