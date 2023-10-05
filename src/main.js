import CardComp from './card';
import './main.css';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Main() {
  let [items, setMeals] = useState([]);
  
 


  async function getMealsData(){
    
      let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      let result = await response.json();
      setMeals(result.meals)
    
      }

  useEffect(function (){
    
    getMealsData()
  
  },[]) 
  


  async function handleSearch(event) {
    event.preventDefault();
    let searchedValue = event.target.search.value;
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`+searchedValue);
    let result = await response.json();
    setMeals(result.meals)
    let filteredMeals = result.meals.filter(function(item){return item.strMeal.toLowerCase().includes(searchedValue.toLowerCase())})
    setMeals(filteredMeals);


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
  {items && items.length !== 0 ? items.map(function(item){
          return(
            <>
        <CardComp key={item.idMeal} image={item.strMealThumb} title={item.strMeal} description={item.strInstructions} category={item.strCategory} FavoriteView={true} />
               </>
      )
  }
  ) : <h3>No search results</h3>}
      </div>
      </>
  )
}

export default Main;