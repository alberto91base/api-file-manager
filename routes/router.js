// Importamos el router de Koa y el servicio de ftp
const Router = require("koa-router");

const uuid = require("../utils/concat.uuid");
const {
  extensionFile,
  validationFileData,
  validationLocationData,
  weightFile,
} = require("../middleware");

// Fijamos la subruta del servicio: /ftp
const router = new Router({
  prefix: "/ftp",
});

module.exports = ({Ftp})=>{
  // Lista con las rutas
// ======================================================= //
//
// Cada vez que detectemos una de las siguientes rutas
// lanzaremos una función asíncrona que hará lo siguiente:
//
// 1. Ejecutamos una función del servicio de Ftp
// 2. Esta función nos devuelve una promesa
// 3. Resolvemos la promesa
// 4. El valor que nos devuelva lo meteremos en el body de la respuesta

// Subida de archivo
  router.post(
    "/upload",
    validationFileData,
    validationLocationData,
    extensionFile,
    weightFile,
    async (ctx, next) => {
      console.log("executed /upload");

      // Si no recibes un name cogemos el valor
      // del archivo que hemos subido
      const data = JSON.parse(JSON.stringify(ctx.request.files));
      let path = ctx.request.body.name
        ? ctx.request.body.name
        : data.imageFile.name;

      let result = Ftp.uploadFile(
        data.imageFile,
        ctx.request.body.location,
        uuid() + path
      );

      // let result = Ftp.pruebaConnect();
      // ctx.body = { response: result };

      ctx.body = await result
        .then((response) => {
          return { response: response };
        })
        .catch((error) => {
          return ctx.throw(500, "Server error", { error: error });
        });

      next();
    }
  );

// Borra un archivo
  router.delete("/remove/:location/:name", async (ctx, next) => {
    console.log("executed /removeFile");

    ctx.body = await Ftp.removeFile(ctx.params.location, ctx.params.name)
      .then((response) => {
        ctx.status = 204;
        return { response: response };
      })
      .catch((error) => {
        return ctx.throw(500, "Server error", { error: error });
      });

    next();
  });

  return router;
}

