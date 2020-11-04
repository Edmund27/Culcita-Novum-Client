const initialState = {
  listings: []
};

export default function listingReducer(state = initialState, action) {
  switch (action.type) {
    
    case "LISTINGS-FETCHED": {
      return {
       
        listings: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
