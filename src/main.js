
import data from './data.json';
import CardComp from './card';

function Main() {
    
  return (
    <>
    <div style= {{display:"flex", justifyContent:"space-between",marginTop:"2%"}}>
    {data.map(function(item){
        return(
          <CardComp image={item.image_url} title={item.title} />
        )
    }
    )}
    </div>
    </>
  );
}

export default Main;