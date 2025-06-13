import React, { useState, useEffect } from 'react'; 
import { FirebaseFirestore } from '../firebase/config'; 
import { collection, getDocs } from 'firebase/firestore'; 


const Home = () => {
  const [restaurants, setRestaurants] = useState([]); 

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantsCollectionRef = collection(FirebaseFirestore, "restaurants");
        const querySnapshot = await getDocs(restaurantsCollectionRef);
        const fetchedRestaurants = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data() 
        }));
        setRestaurants(fetchedRestaurants); 
      } catch (error) {
        console.error("Error al obtener los restaurantes de Firestore: ", error);
      }
    };

    fetchRestaurants();
  }, []); 
  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide m-5 mx-auto" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          {restaurants.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => (
              <div key={restaurant.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <img src={restaurant.image} className="d-block w-100 rounded-4" alt={restaurant.name} />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{restaurant.name}</h5>
                  <p>{restaurant.description}</p>
                  <p><strong>Dirección: </strong>{restaurant.address}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <p className="text-center">Cargando restaurantes...</p>
            </div>
          )}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <footer className="mt-5 py-3  text-center">© Copyright 2025</footer>
    </>
  );
};

export default Home;

//







