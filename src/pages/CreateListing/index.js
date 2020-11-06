import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/categories/actions"
import { selectCategories } from "../../store/categories/selectors"
import { addPost } from "../../store/user/actions"
import { Col, Form, Container, Button, InputGroup, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
export default function CreateListing() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("");
  const [loadingImage, setLoadingImage] = useState("");
  const [cat, setCat] = useState("")
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories);
  }, [dispatch]);


  const categories = useSelector(selectCategories);
  // console.log("CreateListing -> categories", categories)

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


  function submitForm(e) {
    e.preventDefault();
    dispatch(addPost(title, description, image, cat))

    // console.log("this is title", title)
    // console.log("this is description", description)
    // console.log("this is imageurl", image)
    // console.log("this is category value", cat)

    setDescription("")
    setTitle("")
    setImage("")
    setCat("")
history.push("/mypage")
  }

  return (

    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Post a new Ad</h1>
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
        {loadingImage ? "Uploading your image..." : <img alt="upload" src={image} />}
        <br />
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Choose a category: </Form.Label>


          <Form.Control as="select" onChange={(event) => setCat(event.target.value)} >

            {categories.map((c) => {
              return <option value={c.id}>{c.name} </option>

            })}



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