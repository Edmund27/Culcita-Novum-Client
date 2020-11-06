import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardGroup, Container, Button, Image } from "react-bootstrap";
import "../../style/map.css";
import "../../style/listingPage.css"
import moment from "moment";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import axios from "axios";
import socket from '../../socket'
import { apiUrl } from "../../config/constants";
import { Link } from "react-router-dom";
import { selectUser } from "../../store/user/selectors";
import { setSenderName } from "../../store/chats/actions";
import { useHistory } from "react-router-dom";
import { selectUsers } from "../../store/users/selectors";


export default function ListingPage() {
  const [listing, setListing] = useState()
  const dispatch = useDispatch();
  const params = useParams();
  const listingId = params.id;
  const currentUser = useSelector(selectUser);
  const history = useHistory()
  const users = useSelector(selectUsers)

  const sellerObject = listing && users.find(x => x.name === listing.user.name);
  console.log("SellerObj:", sellerObject)

  useEffect(() => {

    async function fetchListing() {
      const results = await axios.get(
        `${apiUrl}/listings/${listingId}`
      );

      setListing(results.data);

    }
    fetchListing()
  }, [listingId]);

  const openChat = (e) => {
    history.push('/chat-screen')
    const usersObject = {
      user: currentUser,
      receiver: sellerObject
    }
    socket.emit('chat', usersObject)
    dispatch(setSenderName(sellerObject));
  }

  return listing ? (
    <>
      <div className="listingPage">
        <Container width="90%">
          <div className="reuseText">
            <h1 className="reuse"> (Re-Use) </h1>
            <p classname="infoWaste"> <em>
              - It saves tons of waste from ending up in landfills which is actually the worst option of all aside from the ocean due to the methane gas issue (86 times stronger than CO2)
  </em></p>
          </div>
        </Container>
      </div>
      <Container>
        <CardGroup>
          <Card >
            <MapContainer style={{ width: '300px', height: "300px", marginLeft: "auto", marginRight: "auto" }} center={[listing.user.lat, listing.user.lng]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[listing.user.lat, listing.user.lng]}>
              </Marker>
            </MapContainer>



            <Card.Body>
              <Image style={{ marginLeft: "20px", marginBottom: "20px" }} src={listing.user.image} roundedCircle width="20%" />
              <Card.Title>Posted By: {listing.user.name}</Card.Title>
    Posting since: {moment(listing.user.createdAt).format("DD-MM-YYYY")}
              <Link to={`/listings/user/${listing.user.id}`}> <Button variant="outline-primary">See other listings</Button></Link>
              <Button variant="outline-primary" onClick={() => openChat()}> Contact </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={listing.image} />
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
        </CardGroup>





      </Container>
    </>
  ) : null

} 