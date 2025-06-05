// import React, { useState, useEffect } from 'react';
// import { FirebaseFirestore } from '../firebase/config';
// import { collection, getDocs } from 'firebase/firestore';

// const Home = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const restaurantsCollectionRef = collection(FirebaseFirestore, "restaurants");
//         const querySnapshot = await getDocs(restaurantsCollectionRef);
//         const fetchedRestaurants = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setRestaurants(fetchedRestaurants);
//         setLoading(false); // Datos cargados, ocultar indicador de carga
//       } catch (error) {
//         console.error("Error al obtener los restaurantes de Firestore: ", error);
//         setLoading(false); // También ocultar si hay un error
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   return (
//     <>
//       <div className="container mt-5"> {/* Contenedor principal para las tarjetas */}
//         <h2 className="text-center mb-4">Nuestros Restaurantes</h2>
//         {loading ? ( // Mostrar un mensaje de carga si los datos aún no están listos
//           <p className="text-center">Cargando restaurantes...</p>
//         ) : (
//           <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"> {/* Fila para las tarjetas, con columnas responsivas y espaciado */}
//             {restaurants.length > 0 ? (
//               restaurants.map((restaurant) => (
//                 <div key={restaurant.id} className="col"> {/* Columna para cada tarjeta */}
//                   <div className="card h-100 shadow-sm"> {/* Componente Card de Bootstrap */}
//                     {restaurant.image && ( // Asegurarse de que la imagen exista
//                       <img
//                         src={restaurant.image}
//                         className="card-img-top"
//                         alt={restaurant.name}
//                         style={{ height: '200px', objectFit: 'cover' }} // Estilo para que las imágenes tengan un tamaño uniforme
//                       />
//                     )}
//                     <div className="card-body d-flex flex-column">
//                       <h5 className="card-title">{restaurant.name}</h5>
//                       <p className="card-text text-muted">
//                         <small>Dirección: {restaurant.address}</small>
//                       </p>
//                       <p className="card-text flex-grow-1">{restaurant.description}</p> {/* flex-grow-1 para que el contenido ocupe el espacio disponible */}
//                       {/* Puedes añadir más detalles o un botón aquí */}
//                       {/* <a href="#" className="btn btn-primary mt-auto">Ver Detalles</a> */} {/* mt-auto para empujar el botón al final */}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-12"> {/* Si no hay restaurantes, un mensaje ocupa toda la fila */}
//                 <p className="text-center">No se encontraron restaurantes.</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* El footer puedes moverlo fuera del container si quieres que esté siempre abajo de la página,
//           o mantenerlo dentro si quieres que esté al final del contenido del container. */}
//       <footer className="mt-5 py-3 bg-light text-center">© Copyright 2025</footer>
//     </>
//   );
// };

// export default Home;





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









