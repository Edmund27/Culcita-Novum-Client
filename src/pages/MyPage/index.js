import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {Card, CardColumns, Button, Form, Container} from "react-bootstrap"
import { fetchUserInfo} from "../../store/user/actions"
import { useDispatch, useSelector } from "react-redux";
import {  selectUser } from "../../store/user/selectors"
import "../../style/dashboard.css"
export default function MyPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  const user = useSelector(selectUser)
  console.log("MyPage -> user", user.listings)

  // function toggle() {


  // }

  return (
    <div>
      <div className="dashboard"><Container>
        <div className="dashTitle">
          
<h1 className="dash"> Your Dashboard </h1>

</div></Container>
</div>
<Container>
<Button variant="light" style={{ width: "30%", padding: "20px", opacity: "0.9", marginLeft: "auto", marginRight: "auto"}} >
        <Link to={`/create`}> Post a new ad </Link>
      </Button>
<div className="row">

  {user.listings && user.listings.map((l)=> {
return <Card style={{width: "25%", padding: "20px", margin: "20px", opacity: "0.9"}}>
    <Card.Img variant="top" src={l.image} />
    <Card.Body>
      <Card.Title>{l.title}</Card.Title>
      <Card.Text>
        {l.description}
      </Card.Text>
      {/* <Form>
  <Form.Check 
    type="switch"
    id="custom-switch"
    label="Check this switch"
  />
  </Form> */}
              <Button >
                {l.availability === "available" ? "✅" : "❌"}
              </Button>
            </Card.Body>
          </Card>

        })}
      </div>
  
  </Container>
     
     
    </div>
  )
}