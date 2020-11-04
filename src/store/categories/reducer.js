const initialState = {
  categories: []
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    
    case "CATEGORIES-FETCHED": {
      return {
        
        categories: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
