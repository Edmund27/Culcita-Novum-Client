import React from "react";
import { Link } from "react-router-dom";


export default function MyPage() {
  return (
    <div>
<h1> POST AN AD HERE AND SEE YOUR ADS </h1>


<button >
        <Link to={`/create`}> post your ad </Link>
      </button> 
    </div>
  );
}