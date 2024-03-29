const fetch = require('node-fetch');

const eliminarPersona = async () => {
  const idPersonaAEliminar = 5; 

  const response = await fetch(`http://localhost:3000/eliminar_persona/${idPersonaAEliminar}`, {
    method: 'DELETE'
  });

  const data = await response.json();
  console.log(data);
};

eliminarPersona();

//post recibir un nombre y buscar ese nombre en ese nombre del pais
//
