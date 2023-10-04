import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function CardComp (props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function saveToLocalStorage (){
    if(localStorage.getItem("favorites")){
    let stringData = localStorage.getItem("favorites")
    let arr = JSON.parse(stringData);
    arr.push(props)

    // -----------------------------
    let stringedData = JSON.stringify(arr)
    localStorage.setItem("favorites", stringedData)
  }
    else {
      let arr = [];
      arr.push(props)
      let stringedData = JSON.stringify(arr)
      localStorage.setItem("favorites", stringedData)
    }
  }

  function deleteFavorites() {

    let stringedLocalData = localStorage.getItem("favorites");
    let localData = JSON.parse(stringedLocalData);
    localData.splice(props.index, 1);
    let storeData = JSON.stringify(localData);
    localStorage.setItem("favorites", storeData);
  }

    return(
      <>
         <>
      {/* card */}
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Title style={{ textAlign: "center", fontWeight: "bold" }}>
            {props.title}
          </Card.Title>
          <Button variant="primary" onClick={handleShow}>
            Show Recipe
          </Button>
          <Button
            variant="primary"
            onClick={props.FavoriteView ? saveToLocalStorage : deleteFavorites}
            style={{ margin: "0 0 0 1rem " }}
          >
            {props.FavoriteView ? "Add Fav" : "Delete Meal"}
          </Button>
        </Card.Body>
      </Card>

      {/* model show */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
      </>
    )
}

export default CardComp;