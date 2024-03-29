const fetch = require('node-fetch');

const crearPersona = async () => {
  const response = await fetch('http://localhost:3000/crear_persona', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: 'Messi',
      fecha_nacimiento: '1988-12-30',
      paisID: 1
    })
  });

  const data = await response.json();
  console.log(data);
};

crearPersona();
