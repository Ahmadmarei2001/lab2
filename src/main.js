import CardComp from './card';
import './main.css';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Main() {
    let [item, setItems] = useState([]);
    let [searchResultMessage, setSearchResultMessage] = useState('');


    async function gitData(){
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken';
  try{
    const response = await fetch(url);
    const result = await response.json();
    console.log(result)
    setItems(result.meals)
  }catch(error){
    console.error(error);
  }
    }

    useEffect(function (){gitData()},[]) 
    


    function handleSearch(event) {
      event.preventDefault();
      const searchedValue = event.target.search.value.toLowerCase();
  
      const filteredItems = item.map(function(item){return item.strMeal.toLowerCase().includes(searchedValue.toLowerCase())})
      setItems(filteredItems);
  
      setSearchResultMessage(filteredItems.length === 0 ? 'No Search Result' : '');
    }
  return (

    <>
    <Form className="d-flex"  id="myform">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              name="search"
            />
            <Button variant="outline-success" type='submit'>Search</Button>
          </Form>
          {searchResultMessage && <h1 style={{marginTop:"10%" ,marginLeft:"40%" }}>{searchResultMessage}</h1>}
    <div style= {{display:"flex", flexWrap:"wrap", justifyContent:"space-between", gap:"20xp", marginTop:"3%"}}>
    {item.map(function(item){
        return(
          <CardComp image={item.strMealThumb} title={item.strMeal} description={item.strInstructions} category={item.strCategory} />
        )
    }
    )}
    </div>
    </>
  );
}

export default Main;