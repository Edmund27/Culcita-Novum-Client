import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function ListingPage() { 
const [listing, setListing] = useState()
console.log("ListingPage -> listing", listing)
  const params = useParams();
  const listingId = params.id;

  useEffect(() => {
    
    async function fetchListing() {
      const results = await axios.get(
        `http://localhost:4000/listings/${listingId}`
      );
      console.log(results.data);
      setListing(results.data);
      
    }
    fetchListing()
  }, [listingId]);

  return listing ? (


    <div>

      <h3>{listing.title}</h3>
    </div>
  ): null

} 