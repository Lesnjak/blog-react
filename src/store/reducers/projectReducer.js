const initState = {}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT_SUCCESS':
      console.log('create project success');
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error');
      return state;
      case 'FILTER-BLOGS':
      return action.payload;
      case 'RESET-FILTER':
        // console.log("---",555);
          return '';
    default:
      return state;
  }
};

export default projectReducer;