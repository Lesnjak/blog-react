import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import {storage} from '../../config/fbConfig'

class CreateProject extends Component {
  state = {
    title: '',
    content: '',
    image:null,
  }
    handleChangeBackground = (e) => {
        if (e.target.files[0]){


            this.setState({
                    image: e.target.files[0]
            })

        }
    }
    handleUploadBackground = () => {
        const {image} = this.state;

        if(image){
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',(snapshot)=>{

            }, (error)=>{
                console.error("---",error);

            }, () =>{
                storage.ref('images').child(image.name).getDownloadURL().then(url=>{
                    this.setState({
                          image:url
                    })
                    this.props.createProject(this.state);
                    this.props.history.push('/');

                    

                })

            })
        }else {
            this.props.createProject(this.state);
            this.props.history.push('/');
        }


    }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
      this.handleUploadBackground();
  }

  render() {
      // console.log("---",this.state);
      
      return (
          <div className="container">
              <div className="row">
                  <div className="col s12">
              <form className="white" onSubmit={this.handleSubmit}>
                  <h5 className="grey-text text-darken-3">Create a New Project</h5>
                  <div className="input-field">
                      <input type="text" id='title' onChange={this.handleChange} />
                      <label htmlFor="title">Project Title</label>
                  </div>
                  <div className="input-field">
                      <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                      <label htmlFor="content">Project Content</label>
                  </div>
                  <div>
                      <div action="#">
                          <div className="file-field input-field">
                              <div className="btn">
                                  <span>File</span>
                                  <input type="file" onChange={this.handleChangeBackground}></input>
                              </div>
                              <div className="file-path-wrapper">
                                  <input className="file-path validate" type="text"></input>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="input-field">
                      <button className="btn pink lighten-1">Create</button>
                  </div>

              </form>
              </div>
              </div>
          </div>
      )
      const { auth } = this.props;
      if (!auth.uid) return <Redirect to='/signin' />
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
