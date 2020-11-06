import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardGroup, Container, Button, Jumbotron, Col, Image } from "react-bootstrap";
import "../../style/map.css";
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
    <Jumbotron>
      <Container>
        <CardGroup>
          <Card >
            <MapContainer style={{ width: '30rem' }} center={[listing.user.lat, listing.user.lng]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[listing.user.lat, listing.user.lng]}>
              </Marker>
            </MapContainer>

            <Col xs="2" md="2">
              <Image src={listing.user.image} roundedCircle />
            </Col>
            <Card.Body>
              <Card.Title>Posted By: {listing.user.name}</Card.Title>
    Posting since: {moment(listing.user.createdAt).format("DD-MM-YYYY")}
              <Link to={`/listings/user/${listing.user.id}`}> <Button variant="primary">See other listings</Button></Link>
              <Button variant="primary" onClick={() => openChat()}>contact</Button>
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
    </Jumbotron>
  ) : null

} 