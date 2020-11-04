import React, { useState, useEffect } from "react";
import { Col, Form, Container, Button, InputGroup, FormControl } from "react-bootstrap";

export default function CreateListing() { 
const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
const [image, setImage] = useState("");
const [loadingImage, setLoadingImage] = useState("");
const [cat, setCat] = useState("")

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


function submitForm(e){
  e.preventDefault();

console.log("this is title", title)
console.log("this is description", description)
console.log("this is imageurl", image)
console.log("this is category value", cat)

}

  return (


   


      <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Post an Ad</h1>
        <Form.Group >
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={event => setTitle(event.target.value)}
            type="text"
            placeholder="Title of your Ad"
            required
          />
        </Form.Group>

        <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Text>Description</InputGroup.Text>
      
    </InputGroup.Prepend>
    <FormControl value={description}
      onChange={event => setDescription(event.target.value)} as="textarea" placeholder="Tell us about your item, such as condition and reason for re-home" />
  </InputGroup>
  <Form.Label> Picture of your item/s: </Form.Label>
        <Form.Control
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={handleUpload}
                
              />
              {loadingImage ? "Uploading your image..." : <img src={image} />}
              <br />
              <Form.Group controlId="exampleForm.SelectCustom">
    <Form.Label>Choose a category: </Form.Label>
    <Form.Control as="select" onChange={(event) => setCat(event.target.value)} >
      <option value={1}>1 </option>
      <option value={2}>2 </option>
      <option value={3}>3 </option>
      
    </Form.Control>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
           Post Ad
          </Button>
        </Form.Group>
        
  </Form.Group>
        </Form>
    </Container>

     

  )

}