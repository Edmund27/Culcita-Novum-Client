import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [loadingImage, setLoadingImage] = useState("");


  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  // image upload functions:

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "g8sfmaki");
    setLoadingImage(true);
    const res = await fetch(
      "http://api.cloudinary.com/v1_1/dztzswpcp/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const fileUpload = await res.json();

    setImage(fileUpload.url);
    setLoadingImage(false);
  };

  function handleUpload(e) {
    e.preventDefault();
    uploadImage(e);
  }

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();
console.log("this is name", name )
console.log("this is surname", surname)
console.log("this is email", email)
console.log("this is password", password)
console.log("this is password", image)
    // dispatch(signUp(name, surname, email, password));

    setEmail("");
    setPassword("");
    setName("");
    setSurname("")
    setImage("")
  }

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Signup</h1>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
            placeholder="Enter name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            value={surname}
            onChange={event => setSurname(event.target.value)}
            type="text"
            placeholder="Enter surname"
            required
          />
        </Form.Group>
        
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={event => setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Form.Label>Profile Picture</Form.Label>
        <Form.Control
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={handleUpload}
                
              />
              {loadingImage ? "Uploading your image..." : <img src={image} />}
              <br />
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Sign up
          </Button>
        </Form.Group>
        <Link to="/login">Click here to log in</Link>
      </Form>
    </Container>
  );
}
