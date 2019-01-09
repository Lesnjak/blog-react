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
       firestore.collection('projects').doc(project.id).update({
           title:project.title,
           content:project.content,
           image:project.image
       }).then((c) => {
               dispatch({ type: 'UPDATE_PROJECT_SUCCESS',c});
           }).catch(err => {
               dispatch({ type: 'UPDATE_PROJECT_ERROR' }, err);
           });


    }
};
export const deleteProject = (id) => {


    return (dispatch, getState, {getFirestore}) => {

        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('projects').doc(id).delete().then(() => {
            dispatch({ type: 'DELETE_PROJECT_SUCCESS' });

        }).catch(err => {
            dispatch({ type: 'DELETE_PROJECT_ERROR' }, err);
        });

    }
};
export const blogFilter = (search) => {
  return {
     type: "FILTER-BLOGS",
      payload:search,
  }

}
export const resetFilter = (a="") => {
    return {
        type: "RESET-FILTER",
        payload: a
    }

}
