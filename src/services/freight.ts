import axios from 'axios';

const calcularFreteMelhorEnvio = async (cepOrigem:string, cepDestino:string, peso:number) => {
  try {
    const response = await axios.post('https://api.melhorenvio.com.br/v2/me/shipment/calculate', {
      products: [
        {
          quantity: 1,
          width: 15,
          height: 10,
          length: 20,
          weight: peso
        }
      ],
      from: {
        postal_code: cepOrigem
      },
      to: {
        postal_code: cepDestino
      }
    }, {
      headers: {
        'Authorization': 'Bearer {API_KEY}'
      }
    });

    // Manipule a resposta de acordo com suas necessidades
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// calcularFreteMelhorEnvio('01000-000', '20000-000', 1);

// export default calcularFreteMelhorEnvio