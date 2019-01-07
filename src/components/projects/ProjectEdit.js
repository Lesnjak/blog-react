import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import photo from '../../assets/no-photo.png'
import Textarea from "react-textarea-autosize"
import { changeProject } from '../../store/actions/projectActions'
import { deleteProject } from '../../store/actions/projectActions'
import {storage} from '../../config/fbConfig'


class ProjectEdit extends Component{
    state = {
        title: this.props.project &&  this.props.project.title,
        content:this.props.project &&  this.props.project.content ,
        image: this.props.project &&  this.props.project.image ,
        id:this.props.match.params.id
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleChangeBackground = (e) => {
        if (e.target.files[0]){


            this.setState({
                image: e.target.files[0]
            })

        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.handleUploadBackground();
    }
    handleUploadBackground = () => {
        const {image} = this.state;

        if(image!== this.props.project.image){
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',(snapshot)=>{

            }, (error)=>{
                console.error("---",error);

            }, () =>{
                storage.ref('images').child(image.name).getDownloadURL().then(url=>{
                    this.setState({
                        image:url
                    })
                    this.props.changeProject(this.state);
                    this.props.history.push('/');



                })

            })
        }else {
            this.props.changeProject(this.state);
            this.props.history.push('/');
        }


    }
    hendleDelete = () =>{
        this.props.deleteProject(this.props.match.params.id);
        this.props.history.push('/');

    }

    // componentWillReceiveProps (nextProps){
    //
    //     this.setState({
    //        image:nextProps.project.image
    //     })
    // }

render(){
    const { project, auth } = this.props;


    // console.log("---",this.state.image);
    
    
    if (!auth.uid) return <Redirect to='/signin'/>
    if (project) {
        return (
            <div className="container section project-details">
                <div className="row">
                    <div className="col s12">
                        <div className="card z-depth-0">
                            <div className="card-image card-image-edit">
                                <div className='half'>
                                    <img src={ project.image ? project.image : photo } className="card-img-top" alt="..."/>
                                </div>
                                <div className='half '>
                                    <h3 className="">change to...</h3>
                                    <form action="#">
                                        <div className="file-field input-field">
                                            <div className="btn">
                                                <span>File</span>
                                                <input type="file" onChange={this.handleChangeBackground}/>
                                            </div>
                                            <div className="file-path-wrapper">
                                                <input className="file-path validate" type="text"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card-content">
                                <span className="card-title">
                                    <Textarea defaultValue={project.title} id='title' onChange={this.handleChange} />
                                </span>
                                <p>
                                    <Textarea defaultValue={project.content} id='content' onChange={this.handleChange} />
                                </p>
                            </div>
                            <div className='flex-button' >
                                <a onClick={this.handleSubmit} className="waves-effect  waves-light pink lighten-1 btn-large">submit changes</a>
                                <a onClick={this.hendleDelete} className="waves-effect  waves-light  btn-large">delete card</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading project...</p>
            </div>
        )
    }
}
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
        project: project,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = {
changeProject,
deleteProject
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{
        collection: 'projects'
    }])
)(ProjectEdit)
