import React, { useEffect}  from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {fetchCategories} from "../../store/categories/actions"
// import {fetchListings} from "../../store/listings/actions"
// import {selectListings} from "../../store/listings/selectors"
// import {selectCategories} from "../../store/categories/selectors"
// import { Link } from "react-router-dom";


export default function Home() {

  // const dispatch = useDispatch();

  // const listings = useSelector(selectListings);
  // const categories = useSelector(selectCategories);

  // useEffect(() => {
  //   dispatch(fetchCategories);
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(fetchListings);
  // }, [dispatch]);


  return (
    <div>
<h1>Welcome</h1>
{/* <button >
        <Link to={`/listings/${l.id}`}>Show Details</Link>
      </button> */}
    </div>
  );
}