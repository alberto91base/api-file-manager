// Declaramos las constantes que necesitamos 
// para arrancar el middleware de Koa
const Koa = require('koa'),
      koaBody = require('koa-body'),
      cors = require('@koa/cors'),
      app = new Koa();
const router = require("koa-router");
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const yamljs = require('yamljs');
const koaSw = require('koa2-swagger-ui');


const Client = require("ftp");
const clientInstance = new Client();

const {
  handlerErrors
} = require('./middleware');

const {
  fileUploadResponse
} = require('./utils/conversor')

const {serviceFTP,serviceMulter,resizeImages} = require("./services");

require('dotenv').config();

const routerApiDoc = new  router();

const spec = yamljs.load('./documentation/api.yaml');
routerApiDoc.get('/api-docs', koaSw.koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));


// importamos el router
const {
  routerFTP,
  routerLocal
} = require('./routes');


// Habilitamos el cors en las peticiones
app.use(cors());

const { imageHandler } = require('./endPoints');
const imageHandlerApi = imageHandler({serviceMulter,fileUploadResponse,resizeImages})

app.use(routerLocal({imageHandlerApi,handlerErrors}).routes())

// Añadimos el body parser para Koa, debe ir luego de multer, sino chocan las configuraciones
app.use(koaBody({
  multipart: true,
  urlencoded: true,
}));


// Usamos las rutas bajo la subruta /ftp
const Ftp = serviceFTP({clientInstance});

app.use(routerFTP({Ftp}).routes());
app.use(routerApiDoc.routes());


// Lanzamos Koa
app.listen(process.env.PORT_APP, () => {
  console.log(`Example app listening on port ${process.env.PORT_APP}!`)
});