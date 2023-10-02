import CardComp from './card';
import './main.css';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function Products() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result.meals);
      setItems(result.meals);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false); 
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const result = await response.json();
      setCategories(result.categories);
      console.log(result.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchItemsByCategory = async (category) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const result = await response.json();
      setItems(result.meals);
      console.log(result.meals);
    } catch (error) {
      console.error('Error fetching items by category:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchItemsByCategory('all');
    getData();
  }, []); 

  const handleChange = async (event) => {
    const changedValue = event.target.value;

    if (changedValue === "all") {
      
      await getData('all');
    } else {
      await fetchItemsByCategory(changedValue);
    }
  };

  return (
    <>
      <Form.Select aria-label="Default select example" onChange={handleChange}>
        <option value="all">All</option>
        {categories.map((category) => (
          <option key={category.strCategory} value={category.strCategory}>
            {category.strCategory}
          </option>
          
        ))}
      </Form.Select>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "20px", marginTop: "3%" }}>
  {loading ? (
    <p>Loading...</p>
  ) : (
    items.length !== 0 ? (
      items.map((item) => (
        <CardComp key={item.idMeal} image={item.strMealThumb} title={item.strMeal} description={item.strInstructions} />
      ))
    ) : (
      <h3>No search results</h3>
    )
  )}
</div>
    </>
  );
}

export default Products;
