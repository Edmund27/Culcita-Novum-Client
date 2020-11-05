import React, {useEffect}from "react";
import { Link } from "react-router-dom";
import {Card, CardColumns, Button} from "react-bootstrap"
import { fetchUserInfo} from "../../store/user/actions"
import { useDispatch, useSelector } from "react-redux";
import {  selectUser } from "../../store/user/selectors"

export default function MyPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  const user = useSelector(selectUser)
  console.log("MyPage -> user", user.listings)
  
  
  return (
    <div>
<h1> Your Dashboard: </h1>

<CardColumns>

  {user.listings && user.listings.map((l)=> {
return <Card>
    <Card.Img variant="top" src={l.image} />
    <Card.Body>
      <Card.Title>{l.title}</Card.Title>
      <Card.Text>
        {l.description}
      </Card.Text>
    </Card.Body>
  </Card>

  })}
  
  </CardColumns>
<Button variant="outline-primary">
        <Link to={`/create`}> post a new ad </Link>
      </Button> 
    </div>
  )
}