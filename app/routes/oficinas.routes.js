
module.exports = app => {
    const oficinas = require("../controllers/oficinas.controller.js");
    const { checkToken } = require('../helpers/middlewares');

  
    const multer = require('multer')({
        dest: 'app/images'
      })
  
  var router = require("express").Router();
    //POST
    // Create a new oficina 
    /**
   * @swagger
   * /api/oficinas/:
   *  post:
   *    summary: Alta nueva oficina.
   *    tags: 
   *      - Oficina
   *    description: Alta nueva oficina.
   *    requestBody:
   *      required: true
   *      content:
   *        form-data:
   *          schema:
   *            type: object
   *            properties:
   *              title:
   *                type: string
   *                description: npmbre de la oficina
   *                example: Edificio Mapfre
   *              description:
   *                type: string
   *                description: Descripción detallada de la oficina.
   *                example: Oficina situada en pleno zona centro ...
   *              metros:
   *                type: string
   *                description: metros cuadrados.
   *                example: 230
   *              is_destacada:
   *                type: Boolean
   *                description: Oficina destacada
   *                example: true/false
   *              zip_code:
   *                type: string
   *                description: Código postal
   *                example: 28040
   *              province:
   *                type: string
   *                description: Provincia
   *                example: Madrid
   *              city:
   *                type: string
   *                description: Ciudad
   *                example: Madrid
   *              modality:
   *                type: string
   *                description: Modalidad Alquiler o Coworking.
   *                example: Alquiler
   *              latitude:
   *                type: string
   *                description: Coordenadas latitud
   *                example: 0
   *              longitude:
   *                type: string
   *                description: Coordenadas Longitud
   *                example: 0
   *              floor:
   *                type: number
   *                description: Planta oficina.
   *                example: 8
   *              parking_public:
   *                type: Boolean
   *                description: Parking público.
   *                example: true/false
   *              parking_private:
   *                type: Boolean
   *                description: Parking privado
   *                example: true/false
   *              underground:
   *                type: string
   *                description: Metro
   *                example: L2
   *              train:
   *                type: string
   *                description: Tren/Cercanias
   *                example: Atocha-Chamrtín
   *              bus:
   *                type: string
   *                description: Autobus
   *                example: 43
   *              comercial:
   *                type: string
   *                description: Comercial asignado.
   *                example: 624ed04b45a2435156d8e95c
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos la información de la nueva oficina
   *        schema:
   *        type: json
   *      500:
   *        description: Error al crear la nueva oficina.
   *        schema:
   *        type: json
   */
    router.post("/", checkToken,oficinas.create);
    //router.post("/", checkToken,multer.single('attachment') ,oficinas.create);
    // Retrieve all oficinas by por opciones
    /**
   * @swagger
   * /api/oficinas/opciones:
   *  post:
   *    summary: Busqueda oficina by opciones o filtros.
   *    tags: 
   *      - Oficina
   *    description: Busqueda oficina by opciones o filtros.
   *    requestBody:
   *      required: false
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              title:
   *                type: string
   *                description: npmbre de la oficina
   *                example: Edificio Mapfre
   *              description:
   *                type: string
   *                description: Descripción detallada de la oficina.
   *                example: Oficina situada en pleno zona centro ...
   *              metros:
   *                type: string
   *                description: metros cuadrados.
   *                example: 230
   *              is_destacada:
   *                type: Boolean
   *                description: Oficina destacada
   *                example: true/false
   *              zip_code:
   *                type: string
   *                description: Código postal
   *                example: 28040
   *              province:
   *                type: string
   *                description: Provincia
   *                example: Madrid
   *              city:
   *                type: string
   *                description: Ciudad
   *                example: Madrid
   *              modality:
   *                type: string
   *                description: Modalidad Alquiler o Coworking.
   *                example: Alquiler
   *              latitude:
   *                type: string
   *                description: Coordenadas latitud
   *                example: 0
   *              longitude:
   *                type: string
   *                description: Coordenadas Longitud
   *                example: 0
   *              floor:
   *                type: number
   *                description: Planta oficina.
   *                example: 8
   *              parking_public:
   *                type: Boolean
   *                description: Parking público.
   *                example: true/false
   *              parking_private:
   *                type: Boolean
   *                description: Parking privado
   *                example: true/false
   *              underground:
   *                type: string
   *                description: Metro
   *                example: L2
   *              train:
   *                type: string
   *                description: Tren/Cercanias
   *                example: Atocha-Chamrtín
   *              bus:
   *                type: string
   *                description: Autobus
   *                example: 43
   *              comercial:
   *                type: string
   *                description: Comercial asignado.
   *                example: 624ed04b45a2435156d8e95c
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos la información de las oficinas.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al buscar las oficinas.
   *        schema:
   *        type: json
   */
    router.post("/opciones",checkToken, oficinas.findAllByoptions); 
    //GET
    // Retrieve all oficinas
    /**
   * @swagger
   * /api/oficinas:
   *  get:
   *    summary: Busquda de oficinas.
   *    tags: 
   *      - Oficina
   *    description:  Busqueda de oficinas.
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos las oficinas
   *        schema:
   *        type: json
   *      500:
   *        description: Error al obtener las oficinas.
   *        schema:
   *        type: json
   */
    router.get("/",checkToken, oficinas.findAll);
    // Retrieve all by destacadas and modality
    /**
   * @swagger
   * /api/oficinas/destacadas/{modality}:
   *  get:
   *    summary: Oficinas destacadas por modalidad (Alquier/Coworking).
   *    tags: 
   *      - Oficina
   *    description: Oficinas destacadas por modalidad (Alquier/Coworking).
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: modality
   *    security:
 *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos la información de las oficinas destacadas según su modalidad.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al obtener la informacion de las oficinas destacadas según su modalidad.
   *        schema:
   *        type: json
   */
    router.get("/destacadas/:modality",checkToken, oficinas.findAllDestacadas);
    // Retrieve all by  modality
    /**
   * @swagger
   * /api/oficinas/modality/{modality}:
   *  get:
   *    summary: Oficinas por modalidad.
   *    tags: 
   *      - Oficina
   *    description: Oficinas por modalidad.
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: modality
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Oficinas por modalidad.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al obtener las oficinas por modalidad.
   *        schema:
   *        type: json
   */
    router.get("/modality/:modality",checkToken, oficinas.findAllModality);
    // Retrieve a single oficinas with id
    /**
   * @swagger
   * /api/oficinas/{id}:
   *  get:
   *    summary: Obtener informacion de una oficina
   *    tags: 
   *      - Oficina
   *    description: Obtenemos la informacion de una oficina.
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: id
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Obtenemos la informacion de una oficina.
   *        schema:
   *        type: json
   *      404:
   *        description: Oficina no encontrada.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al obtener la informacion de la oficina.
   *        schema:
   *        type: json
   */
    router.get("/:id",checkToken, oficinas.findOne);
    //PUT
    // Update a oficinas with id
    /**
   * @swagger
   * /api/oficinas/{id}:
   *  put:
   *    summary: Modificar una oficina by id
   *    tags: 
   *      - Oficina
   *    description: Modificar una oficina by id
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: id
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Oficina modificada correctamente.
   *        schema:
   *        type: json
   *      404:
   *        description: Oficina no encontrada.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al modificar la oficina.
   *        schema:
   *        type: json
   */
    router.put("/:id",checkToken, oficinas.update);
    //DELETE
    // Delete a oficinas with id
    /**
   * @swagger
   * /api/oficinas/{id}:
   *  delete:
   *    summary: Eliminamos oficina by id
   *    tags: 
   *      - Oficina
   *    description: Eliminamos oficina
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: id
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Oficina eliminada correctamente.
   *        schema:
   *        type: json
   *      404:
   *        description: Oficina no encontrada.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al obtener borrar oficina.
   *        schema:
   *        type: json
   */
    router.delete("/:id",checkToken, oficinas.delete);
    // Delete all oficinas
    /**
   * @swagger
   * /api/oficinas:
   *  delete:
   *    summary: Eliminar todass las oficinas
   *    tags: 
   *      - Oficina
   *    description: Eliminar todas las oficinas de la base de datos.
   *    produces:
   *      - application/json
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Oficinas borradas correctamente.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al borrar la oficinas de la bae de datos.
   *        schema:
   *        type: json
   */
    router.delete("/", checkToken,oficinas.deleteAll);

    app.use("/api/oficinas", router);
  };
  