
import data from './data.json';
import CardComp from './card';
import './main.css';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Products (){
    let [item, setItems] = useState(data);

    function handleSearch(event){
      event.preventDefault()
    let searchedValue = event.target.search.value;

    let filteredItems = data.filter(function(item){return item.title.toLowerCase().includes(searchedValue.toLowerCase())})
    setItems(filteredItems);
  }
  return (
    <>
    <Form className="d-flex" onSubmit={handleSearch} id="myform">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              name="search"
            />
            <Button variant="outline-success" type='submit'>Search</Button>
          </Form>
    <div style= {{display:"flex", justifyContent:"space-between",marginTop:"2%"}}>
    {item.map(function(item){
        return(
          <CardComp image={item.image_url} title={item.title} description={item.description} category={item.category} />
        )
    }
    )}
    </div>
    </>
  );
}
export default Products;