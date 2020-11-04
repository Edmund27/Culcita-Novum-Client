export function selectListings(reduxState) {
  // console.log("selectListings -> reduxState", reduxState)
  return reduxState.listingReducer.listings;
}