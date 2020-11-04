import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Card, CardColumns, Box} from "react-bootstrap";
import "../../style/map.css";
import moment from "moment";
// import {Map, Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import axios from "axios";


export default function ListingPage() { 
const [listing, setListing] = useState()
  const params = useParams();
  const listingId = params.id;

  useEffect(() => {
    
    async function fetchListing() {
      const results = await axios.get(
        `http://localhost:4000/listings/${listingId}`
      );
      
      setListing(results.data);
      
    }
    fetchListing()
  }, [listingId]);

  console.log("WHAT IS LISTING", listing)
  return listing ? ( 
<CardColumns>
    <Card style={{ width: '25rem'  }}>
    <Card.Img variant="top" src={listing.image}  />
    <Card.Body>
      <Card.Title>{listing.title}</Card.Title>
      <Card.Text>
      {listing.description}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
     
      <small className="text-muted"> Posted on: {moment(listing.createdAt).format("DD-MM-YYYY")}</small>
    </Card.Footer>
  </Card>



<Card style={{ width: '25rem'  }}>
<MapContainer style={{ width: '25rem'  }}   center={[listing.user.lat, listing.user.lng]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />
<Marker position={[listing.user.lat, listing.user.lng]}>
      </Marker>
</MapContainer>
</Card>
 </CardColumns>

  ): null

} 