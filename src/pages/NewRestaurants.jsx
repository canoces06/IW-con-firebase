import React, { useEffect } from 'react';

import { FirebaseFirestore } from '../firebase/config'; 
import { collection, addDoc } from 'firebase/firestore'; 

const NewRestaurants = () => {
  useEffect(() => {
    const restaurantForm = document.getElementById("restaurantForm");

    if (restaurantForm) {
      const handleSubmit = async (event) => { 
        event.preventDefault();

        let name = document.getElementById("name").value;
        let description = document.getElementById("description").value;
        let address = document.getElementById("address").value;
        let imageUrl = document.getElementById("imageUrl").value;

        try {
         
          const restaurantsCollectionRef = collection(FirebaseFirestore, "restaurants");

          
          await addDoc(restaurantsCollectionRef, {
            name: name,
            description: description,
            address: address,
            image: imageUrl, 
            
            createdAt: new Date() 
          });

          console.log("Restaurante agregado con éxito a Firestore!");
          alert("Restaurante agregado con éxito!"); 

          // con esto limpiamos el formulario
          restaurantForm.reset();

        

        } catch (e) {
          console.error("Error al agregar el documento: ", e);
          alert("Error al agregar el restaurante. Consulta la consola.");
        }
      };

      restaurantForm.addEventListener("submit", handleSubmit);

      return () => {
        restaurantForm.removeEventListener("submit", handleSubmit);
      };
    } else {
      console.warn("Elemento con ID 'restaurantForm' no encontrado en el DOM.");
    }
  }, []);

  return (
    <div>
      <div className="container my-4 rounded-3" id="AgregarContainer">
        <h3 className="text-center fw-bold mb-5">Agregar Nuevo Restaurante</h3>

        <form id="restaurantForm">
          <div className="mb-3 fw-bold">
            <label htmlFor="name" className="form-label">Nombre del Restaurante</label>
            <input type="text" className="form-control" id="name" title="Escriba el nombre del restaurante" required />
          </div>
          <div className="mb-3 fw-bold">
            <label htmlFor="description" className="form-label">Descripción</label>
            <textarea className="form-control" id="description" rows="2" title="Escriba una descripción breve" required></textarea>
          </div>
          <div className="mb-3 fw-bold">
            <label htmlFor="address" className="form-label">Dirección</label>
            <input type="text" className="form-control" id="address" title="Escriba la dirección" required />
          </div>
          <div className="mb-3 fw-bold">
            <label htmlFor="imageUrl" className="form-label">URL de la Imagen</label>
            <input type="text" className="form-control" id="imageUrl" title="Pegue aquí la URL del restaurante" required />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            style={{ color: 'rgb(255, 254, 254)', width: '50%', backgroundColor: 'rgba(158, 9, 9)', marginTop: '15px' }}
          >
            Agregar Restaurante
          </button>
        </form>
      </div>

      <div className="row g-4 p-3 m-4 justify-content-right" id="restaurantList">
        {}
      </div>
    </div>
  );
};

export default NewRestaurants;

