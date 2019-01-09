import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import ProjectEdit from './components/projects/ProjectEdit'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject'
import Footer from './components/footer/Footer'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route exact path='/project/:id' component={ProjectDetails} />
            <Route exact path='/project/edit/:id' component={ProjectEdit} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProject} />
          </Switch>
            <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
