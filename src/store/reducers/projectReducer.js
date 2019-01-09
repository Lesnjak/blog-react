const initState = {}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT_SUCCESS':
      console.log('create project success');
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error');
      return state;
      case 'UPDATE_PROJECT_SUCCESS':
          console.log('update-success');
          return action.project;
      case 'UPDATE_PROJECT_ERROR':
          console.log('update-error');
          return state;
      case 'DELETE_PROJECT_SUCCESS':
          console.log('delete-success');
          return state;
      case 'DELETE_PROJECT_ERROR':
          console.log('delete-error');
          return state;
      case 'FILTER-BLOGS':
      return action.payload;
      case 'RESET-FILTER':
          return action.payload;
    default:
      return state;
  }
};

export default projectReducer;