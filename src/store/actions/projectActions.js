export const createProject = (project) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date(),
      image:project.image
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
    });
  }
};
export const changeProject = (project) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
       firestore.collection('projects').doc('BdIxGAafiSv84xuomRwP').update({
           title:"Open Source Roadmap"
       });
        
        // firestore.collection('projects').add({
        //     ...project,
        //     authorFirstName: profile.firstName,
        //     authorLastName: profile.lastName,
        //     authorId: authorId,
        //     createdAt: new Date(),
        //     image:project.image
        // }).then(() => {
        //     dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
        // }).catch(err => {
        //     dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
        // });
    }
};

export const blogFilter = (search) => {
  return {
     type: "FILTER-BLOGS",
      payload:search,
  }

}
export const resetFilter = () => {


    return {
        type: "RESET-FILTER",
    }

}
