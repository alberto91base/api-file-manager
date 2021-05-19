

// Declaramos la librería de ftp y fs
// y creamos un objeto de conexión ftp y un objeto vacio

  //fs = require("fs"),

// Según si hemos lanzado la tarea en pro o dev o staging
// cogeremos las variables de entorno requeridas
const { FTP_URL, PORT_FTP, FTP_USER, FTP_PASSWORD } = process.env;

// Creamos un objeto con las propiedades de la conexion
let connectionProperties = {
  host: FTP_URL,
  user: FTP_USER,
  password: FTP_PASSWORD,
  port: PORT_FTP,
  secure: true,
  secureOptions: { rejectUnauthorized: false }
};

// Vamos añadiendo funciones al objeto ftp que será el que finalmente retornemos
// ================================================================
// Siempre haremos la misma funcionalidad:
// 1. Establecemos una conexión de ftp
// 2. Creamos una promesa con la resolución de la función
// 3. Cerramos la conexión
// 4. Devolvemos la promesa

module.exports = ({clientInstance})=>({

  uploadFile:  (file, location, path) => {
    try{


      return new Promise((resolve, reject) => {
        // Comando de subida de fichero
        clientInstance.connect(connectionProperties);
        clientInstance.put(
          file.path,
          process.env.FTP_ROOT_DIRECTORY + location + "/" + path,
          false,
          (err) => {
            if (err) reject(err);
            clientInstance.end();
            resolve(process.env.FTP_ROOT_DIRECTORY + location + "/" + path);
          }
        );
      });


    }catch(ee){
      console.log(ee)
    }



  },

  removeFile: (location, name) => {
    clientInstance.connect(connectionProperties);
    return new Promise((resolve, reject) => {
      // Comando de borrar un archivo
      console.log(process.env.FTP_ROOT_DIRECTORY + location + "/" + name);
      clientInstance.delete(process.env.FTP_ROOT_DIRECTORY + location + "/" + name, (err) => {
        clientInstance.end();
        err
          ? reject(err)
          : resolve("Archivo " + name + " borrado del proyecto " + location);
      });
    });
  }

})
