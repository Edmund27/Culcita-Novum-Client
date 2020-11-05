import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Card, CardGroup, Button, Jumbotron, Container} from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import { apiUrl } from "../../config/constants";

export default function UserPage() { 
const [data, setData] = useState()
console.log("UserPage -> listing", data)
  const params = useParams();
  const userId = params.id;

  useEffect(() => {
    
    async function fetchListing() {
      const results = await axios.get(
        `http://localhost:4000/listings/user/${userId}`
        // `${apiUrl}/listings/user/${userId}`
      );
      // console.log("fetchListing -> results", results)
      
      setData(results.data);
      
    }
    fetchListing()
  }, [userId]);


return data ?(

<div>
<Jumbotron fluid>
  <Container>
    <h1>User: {data.name}</h1>
    <p>
      Has {data.listings.length === 0 ? "no" : data.listings.length} ads 
    </p>
  </Container>
</Jumbotron>
<CardGroup>
  
  {data.listings.map((l)=>{ return <Card>
    <Card.Img variant="top" src={l.image} />
    <Card.Body>
      <Card.Title>{l.title}</Card.Title>
      <Card.Text>
       {l.description}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{l.createdAt}</small>
    </Card.Footer>
  </Card> })}
 
  </CardGroup>
</div>) : null
  // console.log("WHAT IS LISTING", listing)
//   return listing ? ( 
// <CardColumns>
//     <Card style={{ width: '25rem'  }}>
//     <Card.Img variant="top" src={listing.image}  />
//     <Card.Body>
//       <Card.Title>{listing.title}</Card.Title>
//       <Card.Text>
//       {listing.description}
//       </Card.Text>
//     </Card.Body>
//     <Card.Footer>
     
//       <small className="text-muted"> Posted on: {moment(listing.createdAt).format("DD-MM-YYYY")}</small>
//     </Card.Footer>
//   </Card>
//   <Card style={{ width: '18rem' }}>
//   <Card.Img variant="top" src={listing.user.image} />
//   <Card.Body>
//   <Card.Title>Posted By: {listing.user.name}</Card.Title>
//     Posting since: {moment(listing.user.createdAt).format("DD-MM-YYYY")}
//     <Button variant="primary">See other listings</Button>
//   </Card.Body>
// </Card>
// </CardColumns>



//   ): null

}