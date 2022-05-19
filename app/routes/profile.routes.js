
module.exports = app => {
    const profilesController = require("../controllers/profiles.controller.js");
    const { checkToken } = require('../helpers/middlewares');
    const storage = require('../helpers/storage');
  
    var router = require("express").Router();
    //GET
    /**
   * @swagger
   * /api/profiles:
   *  get:
   *    summary: Obtenemos todas las imágenes.
   *    tags: 
   *      - Imagenes
   *    description:  Obtenemos todas las imágenes.
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos las imágenes.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al obtener las imágenes.
   *        schema:
   *        type: json
   */
    router.get('/' ,checkToken, profilesController.getProfiles);
    // Retrieve all by  OficinaId
    /**
   * @swagger
   * /api/profiles/{id}:
   *  get:
   *    summary: Obtenemos las rutas de las imágenes de una oficina.
   *    tags: 
   *      - Imagenes
   *    description: Obtenemos las rutas de las imágenes de una oficina.
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: oficinaId
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos las rutas de las imágenes de una oficina.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al obtener la informacion de Profiles.
   *        schema:
   *        type: json
   */
    router.get("/:oficinaId",checkToken, profilesController.getProfilesOficinaId);
    //POST
    /**
   * @swagger
   * /api/profiles:
   *  post:
   *    summary: Alta imágen
   *    tags: 
   *      - Imagenes
   *    description:  Alta imágen
   *    requestBody:
   *      required: false
   *      content:
   *        multipart/form-data:
   *          schema:
   *            type: object
   *            properties:
   *              oficinaId:
   *                type: string
   *                description: Oficina a la que pertenece la imagen
   *                example: 62548f1655364d09144ee0ee
   *              name:
   *                type: string
   *                description: descripción a la que hace referncia la imagen.
   *                example: Fachada exterior.
   *              imagePrincipal:
   *                type: string
   *                description: Marcamos la imagen como pricnipal
   *                example: Si/No
   *              imagePath:
   *                type: string
   *                format: binary
   *                description: Nombre del fichero.
   *                example: example.jpeg
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos la información del nuevo registro y reescalamos las imagenes en función de su uso.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al dar de alta la nueva imágen.
   *        schema:
   *        type: json
   */
    router.post('/',checkToken, storage, profilesController.postProfile);
    //DELETE
    // Delete a profiles with id
    /**
   * @swagger
   * /api/profiles/{id}:
   *  delete:
   *    summary: Eliminamos una imagen de una oficina.
   *    tags: 
   *      - Imagenes
   *    description: Eliminamos una imagen de una oficina.
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: id
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Mensaje imágen eliminada.
   *        schema:
   *        type: json
   *      404:
   *        description: imágen no encontrada.
   *        schema:
   *        type: json
   *      500:
   *        description: Error imposible borrar imágen.
   *        schema:
   *        type: json
   */
    router.delete("/:id",checkToken, profilesController.delete);
    // Delete all profiles
    /**
   * @swagger
   * /api/profiles:
   *  delete:
   *    summary: Eliminar todass las imagenes
   *    tags: 
   *      - Imagenes
   *    description: Eliminar todas las imagenes de la base de datos.
   *    produces:
   *      - application/json
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Mensaje imágenes eliminadas.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al eliminar imágenes.
   *        schema:
   *        type: json
   */
    router.delete("/", checkToken,profilesController.deleteAll);
    // Delete all profiles by OificinaId
    router.delete("/profilebyoficina/:oficinaId", checkToken,profilesController.deleteAllByOficinaid);

    app.use("/api/profiles", router);
  };
