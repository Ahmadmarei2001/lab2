import CardComp from './card';
import './main.css';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function Products() {
  let [items, setItems] = useState([]);
  let [categories, setCategories] = useState([]);
  let [loading, setLoading] = useState(true);


  async function getMeals() {
      let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      let result = await response.json();
      setItems(result.meals);
      setLoading(false);
  }

  async function fetchCategories() {
      let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const result = await response.json();
      setCategories(result.categories);
  }

  async function fetchMealsByCategory (category) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`+category);
      const result = await response.json();
      setItems(result.meals);
  }

  useEffect(function()  {
    fetchCategories();
    fetchMealsByCategory();
    getMeals('all');
  }, []);

  async function handleChange(event)  {
    const changedValue = event.target.value;
    if (changedValue === "all") {
      await getMeals('all');
    } else {
      await fetchMealsByCategory(changedValue);
    }
  };

  return (
    <>
      <Form.Select aria-label="Default select example" onChange={handleChange}>
        <option value="all">All</option>
        {categories.map((category) => (
          <option key={category.strCategory} value={category.strCategory}>{category.strCategory}
          </option>
        ))}

      </Form.Select>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "20px", marginTop: "2%" }}>
  {loading ? (
    <p>Loading...</p>
  ) : (
    items && items.length !== 0 ? ( items.map((item) => (
        
        <>
        <CardComp key={item.idMeal} image={item.strMealThumb} title={item.strMeal} description={item.strInstructions} FavoriteView={true}
         />
         </>
      ))
    ) : (
      <h3>No search results</h3>
    )
  )}
</div>
    </>
  )
}
export default Products;