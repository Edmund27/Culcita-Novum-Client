import React, { useEffect, useState}  from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCategories} from "../../store/categories/actions"
import {fetchListings} from "../../store/listings/actions"
import {selectListings} from "../../store/listings/selectors"
import {selectCategories} from "../../store/categories/selectors"
import { Link } from "react-router-dom";
import { Dropdown, Form, InputGroup, Button, FormControl } from "react-bootstrap";

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
    } else if (search !== []) 
  { filteredListings = listings.filter((l) => { return l.title.toLowerCase().includes(queryParam) })
} else { filteredListings = listings}
      
     
      
  return (
    <div>
<h1>Welcome</h1>
<Dropdown>
    

    <Form.Label>Choose a category: </Form.Label>

    
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
            {search ? (
              <>
                <Button
                 
                  onClick={() => setSearch("")}
                >
                  Clear
                </Button>
              </>
            ) : null}
          </InputGroup>

{filteredListings.map((l)=>{
return <>

<h3 key={l.id}>{l.title}</h3>
<button>
        <Link to={`/listings/${l.id}`}> Show Details </Link>
      </button> 
</>
})}

    </div>
  );
}