export function selectCategories(reduxState) {
  // console.log("selectCategories -> reduxState", reduxState)
  return reduxState.categoryReducer.categories;
}