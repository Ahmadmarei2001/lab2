import CardComp from './card';
import './main.css';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Main() {
  let [items, setItems] = useState([]);
  
 


  async function getData(){
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    try{
      const response = await fetch(url);
      const result = await response.json();
      console.log(result.meals)
      setItems(result.meals)
    }catch(error){
      console.error(error);
    }
      }

  useEffect(function (){getData()},[]) 
  


  async function handleSearch(event) {
    event.preventDefault();
    let searchedValue = event.target.search.value;
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedValue}`;

    let response = await fetch(url);
    let result = await response.json();

    let filteredItems = result.meals.filter(function(item){return item.strMeal.toLowerCase().includes(searchedValue.toLowerCase())})
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
            required
          />
          <Button variant="outline-success" type='submit'>Search</Button>
        </Form>
  <div style= {{display:"flex", flexWrap:"wrap", justifyContent:"space-between", gap:"20xp", marginTop:"3%"}}>
  {items.length !==0 ? items.map(function(item){
          return(
            <>
        <CardComp image={item.strMealThumb} title={item.strMeal} description={item.strInstructions} category={item.strCategory} />
        </>
      )
  }
  ) : <h3>No search results</h3>}
  </div>
  </>
);
}

export default Main;