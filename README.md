# Integración de servicios de auth (Facebook y Google) + Realizar Pagos con PayPal - Firebase v9

Un pequeño flujo de trabajo realizado en Javascript con Firebase v9 que consiste en lo siguiente:

- Loggin de usuarios con los servicios de Facebook y Google.
- Realización de pagos de un producto por medio de Paypal.
- Almacenamiento de información de pago y usuario en Firestore.

## Ejecutar la aplicación

Clonar el proyecto.

```bash
  git clone https://github.com/max-florian/firebase-fb-gm-paypal
```

Ir al directorio del proyecto, realizar instalaciones y configuraciones necesarias y cambiar credenciales de aplicaciones facebook, firebase y paypal.

```bash
  cd firebase-fb-gm-paypal
```

Iniciar el servidor con Live Server en VSC.

- Sobre el archivo "index.html".
- Cambiar la IP por "localhost".

```bash
  Alt + L Alt + O
```

## Creación de aplicación en Facebook

Acceder al website de developers de facebook.
![Screenshot](imgs/1.PNG)

Crear una nueva aplicación.
![Screenshot](imgs/2.PNG)
![Screenshot](imgs/3.PNG)
![Screenshot](imgs/4.PNG)

En "Agregar productos a tu app" seleccionar "Inicio de sesión con FB".
![Screenshot](imgs/10.PNG)
![Screenshot](imgs/11.PNG)

En "Configuración" deberá pegarse un URI de redireccionamiento que se obtiene cuando se agrega el servicio auth de facebook en firebase.
![Screenshot](imgs/12.PNG)

Copiar identificador de app y clave secreta. Estas serán necesarias para completar la configuración del servicio auth de Facebook en Firebase.
![Screenshot](imgs/15.PNG)

## Creación proyecto en Firebase

Dirigirse a la consola de firebase.
![Screenshot](imgs/5.PNG)

Crear un nuevo proyecto.
![Screenshot](imgs/6.PNG)
![Screenshot](imgs/7.PNG)

En authentication agregar el servicio de autenticación de Facebook.
![Screenshot](imgs/8.PNG)
![Screenshot](imgs/9.PNG)

Copiar la URI necesaria para configurar la aplicación de facebook y pegarla en el apartado mencionado anteriormente.
![Screenshot](imgs/13.PNG)
![Screenshot](imgs/14.PNG)

Pegar id de app y clave secreta de la aplicación de Facebook en el siguiente apartado en Firebase.
![Screenshot](imgs/16.PNG)

Dirigirse a la configuración del proyecto.
![Screenshot](imgs/17.PNG)

Agregar firebase a la aplicación JS.
![Screenshot](imgs/18.PNG)
![Screenshot](imgs/19.PNG)

Copiar contenido importante para agregar el SDK de firebase a la aplicación JS.
![Screenshot](imgs/20.PNG)

En authentication agregar el servicio de autenticación de Google y configurar el proyecto.
![Screenshot](imgs/23.PNG)
![Screenshot](imgs/24.PNG)
![Screenshot](imgs/25.PNG)

## Creación de aplicación en PayPal

Dirigirse al website de developers de PayPal y crear una nueva app.
![Screenshot](imgs/26.PNG)
![Screenshot](imgs/27.PNG)

En "APIs & SDKs" dirigirse a Script Configuration para copiar el script que agrega el sdk de PayPal en la aplicación. En dicho script "YOUR_CLIENT_ID" se reemplaza por el client id obtenido de la aplicación que recien creamos.
![Screenshot](imgs/28.PNG)
![Screenshot](imgs/29.PNG)

Copiar secreto ya que nos servirá en nuestra aplicación JS.
![Screenshot](imgs/33.PNG)

## Configuración de firebase functions

Instalar firebase-tools.
![Screenshot](imgs/30.PNG)

Loggearse en firebase.
![Screenshot](imgs/31.PNG)

Inicializar firebase en el folder del proyecto y agregar el feature de "functions" y configurar de acuerdo a la siguiente imagen.
![Screenshot](imgs/32.PNG)

Instalar paquete de checkout de Paypal. Y configurar las siguientes variables con el client id y secret de la aplicación de PayPal. Esto se realiza para manejar estas credenciales a nivel de la nube y no exponerlas en ningún archivo del proyecto.
![Screenshot](imgs/34.PNG)

Realizar la siguiente actualización de facturación de firebase para poder hacer el deploy de dichas funciones.
![Screenshot](imgs/35.PNG)
![Screenshot](imgs/36.PNG)
![Screenshot](imgs/37.PNG)
![Screenshot](imgs/38.PNG)
![Screenshot](imgs/39.PNG)
![Screenshot](imgs/41.PNG)

Las funciones para manejar los eventos de Paypal Son las siguientes.

```javascript
exports.paypalCreateOrder = functions.https.onCall(async (data, context) => {
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.00",
        },
      },
    ],
  });

  const response = await client.execute(request);

  return response.result;
});

exports.paypalHandleOrder = functions.https.onCall(async (data, context) => {
  const orderId = data.orderId;
  request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});
  const response = await client.execute(request);

  return response.result;
});
```

Podemos observar las funciones que se agregaron a la aplicación JS en nuestro proyecto de Firebase.
![Screenshot](imgs/41_5.PNG)

## Creación de colección Firestore

Se crea una nueva base de datos.
![Screenshot](imgs/21.PNG)
![Screenshot](imgs/22.PNG)

Se agrega una nueva colección
![Screenshot](imgs/44.PNG)

Se agrega un nuevo documento donde de capture el payment u order id el correo del usuario y su uid.
![Screenshot](imgs/45.PNG)

## Credenciales de Prueba PayPal

Nos dirigimos a Sandbox -> Accounts para obtener nuestras credenciales de prueba para realizar pagos por medio de PayPal en nuestra aplicación.
![Screenshot](imgs/42.PNG)

Se recomienda cambiar la contraseña de estas cuentas de prueba.
![Screenshot](imgs/43.PNG)
