import React, { useEffect, useState}  from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCategories} from "../../store/categories/actions"
import {fetchListings} from "../../store/listings/actions"
import {selectListings} from "../../store/listings/selectors"
import {selectCategories} from "../../store/categories/selectors"
import { Link } from "react-router-dom";
import { CardDeck, Jumbotron, Dropdown, Form, InputGroup, Button, FormControl, CardColumns, Card, Container} from "react-bootstrap";
import moment from "moment";
import "../../style/home.css"

export default function Home() {
  const [cat, setCat] = useState("")
  const [search, setSearch] = useState([])

  const dispatch = useDispatch();
  const listings = useSelector(selectListings);
  const categories = useSelector(selectCategories);
  
  const queryParam = encodeURIComponent(search);

  
  useEffect(() => {
    dispatch(fetchCategories);
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchListings);
  }, [dispatch]);


  let filteredListings;
  if (cat === "all")
    {
      filteredListings = listings
    }
    else if (cat === "1")
    {
      filteredListings = listings.filter((l)=> {return l.categoryId === 1} )
    } else if (cat === "2")
    {
      filteredListings = listings.filter((l)=> {return l.categoryId === 2} )
    } else if (cat === "3")
    {
      filteredListings = listings.filter((l)=> {return l.categoryId === 3} )
    }else if (cat === "4")
    {
      filteredListings = listings.filter((l)=> {return l.categoryId === 4} )
    }else if (cat === "5")
    {
      filteredListings = listings.filter((l)=> {return l.categoryId === 5} )
    }else if (cat === "6")
    {
      filteredListings = listings.filter((l)=> {return l.categoryId === 6} )
    }else if (cat === "7")
    {
      filteredListings = listings.filter((l)=> {return l.categoryId === 7} )
    }else if (cat === "8")
    {
      filteredListings = listings.filter((l)=> {return l.categoryId === 8} )
    } else if (cat === "9")
    {
      filteredListings = listings.filter((l)=> {return l.categoryId === 9} )
    } 
 else { filteredListings = listings}
      
 
  
let searchedFor;
if (search !== []) 
{ searchedFor = filteredListings.filter((l) => { return l.title.toLowerCase().includes(queryParam) }) }
else {searchedFor = filteredListings}

  return (
    <div>
      <div className="homePageJumbo">
      <Container>


<Dropdown>
    
<div className="formLabel">
    <Form.Label>Choose a category: </Form.Label>
</div>
    
<Form.Control as="select" onChange={(event) => setCat(event.target.value)} >

{categories.map((c)=>{
return <option value={c.id}>{c.name} </option>

})}
  
  <option value="all"> See All </option>
  
</Form.Control>
   
  </Dropdown>


  <InputGroup>
            
            <FormControl
              
              placeholder="Search items"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {
              <>
                <Button
                 
                  onClick={() => setSearch("")}
                >
                  Clear
                </Button>
              </>
            }
          </InputGroup> 
         
          
          </Container>
          </div>
          
          <div className="row">
          
{searchedFor.length === 0 ? "Sorry, 0 results found" :
searchedFor.map((l)=>{
return <>


    <Card key={l.id} style={{width: "25%", padding: "20px", margin: "20px", opacity: "0.9"}}  >
    <Card.Img variant="top" src={l.image}  />
    <Card.Body>
      <Card.Title>{l.title}</Card.Title>
      <Card.Text>
      {l.description}
      </Card.Text>
    </Card.Body>
    <Button variant="outline-primary">
        <Link to={`/listings/${l.id}`}> Show Details </Link>
      </Button>
    <Card.Footer>
     
      <small className="text-muted"> Posted on: {moment(l.createdAt).format("DD-MM-YYYY")}</small>
    </Card.Footer>
  </Card>
 
  
 
</>
})}

</div>
    </div>
  );
}