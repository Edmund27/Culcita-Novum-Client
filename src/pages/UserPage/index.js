import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Container, Image } from "react-bootstrap";
import axios from "axios";
import { apiUrl } from "../../config/constants";
import "../../style/userPage.css"
export default function UserPage() {
  const [data, setData] = useState()
  console.log("UserPage -> listing", data)
  const params = useParams();
  const userId = params.id;

  useEffect(() => {

    async function fetchListing() {
      const results = await axios.get(
        // `http://localhost:4000/listings/user/${userId}`
        `${apiUrl}/listings/user/${userId}`
      );
      // console.log("fetchListing -> results", results)

      setData(results.data);

    }
    fetchListing()
  }, [userId]);


  return data ? (

    <div>
      <div className="userPage">
        <Container>
          <div className="userInfo">

            <Image width="10%" src={data && data.image} roundedCircle style={{ align: "left" }} />
            <h1>{data.name}</h1>
            <p>
              Has {data.listings.length === 0 ? "no" : data.listings.length} ads
    </p>
          </div>
        </Container>
      </div>

      <div className="row">
        {data.listings.map((l) => {
          return <Card style={{ width: "350px", padding: "20px", margin: "20px", opacity: "0.9" }} >
            <Card.Img variant="top" src={l.image} width="60%" height="250px" />
            <Card.Body>
              <Card.Title>{l.title}</Card.Title>
              <Card.Text>
                {l.description}
              </Card.Text>
            </Card.Body>
            <Button variant="outline-primary">
              <Link to={`/listings/${l.id}`}> Check me out </Link>
            </Button>
            <Card.Footer>
              <small className="text-muted">{l.createdAt}</small>
            </Card.Footer>
          </Card>
        })}
      </div>

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