
module.exports = app => {
  const comerciales = require("../controllers/comercial.controller.js");
  const { checkToken } = require('../helpers/middlewares');

  var router = require("express").Router();

  // login  Usurio
  /**
   * @swagger
   * /api/comerciales/login:
   *  post:
   *    summary: Login usuario
   *    tags: 
   *      - Usuario
   *    description: Login de usuario.
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              usuario:
   *                type: string
   *                description: usuario login
   *                example: basico
   *              pwd:
   *                type: string
   *                description: usuario login
   *                example: usuariobasico
   *    responses:
   *      200:
   *        description: Devolvemos la información del usuario  y el token asociado..
   *        schema:
   *        type: json
   *      500:
   *        description: Usuario o contraseña erroneos.
   *        schema:
   *        type: json
   */
  router.post("/login", comerciales.login);
  // Crear nuevo usuario (Comercial/Administador)
  /**
   * @swagger
   * /api/comerciales/:
   *  post:
   *    summary: Alta usuario Comercial/Administrador
   *    tags: 
   *      - Usuario
   *    description: Alta usuario Comercial/Administrador , usuario Comercial solo puede gestionar las oficinas, usuario Adminsitrador puede gestionar oficinas y usuarios.
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              nombre:
   *                type: string
   *                description: Nombre completo usuario
   *                example: Usuario Básico
   *              usuario:
   *                type: string
   *                description: nombre de usuario
   *                example: basico
   *              pwd:
   *                type: string
   *                description: password usuario
   *                example: usuariobasico
   *              email:
   *                type: string
   *                description: email usuario
   *                example: pedro@gmail.com
   *              role:
   *                type: string
   *                description: Rol usuario Comercial o Administrador
   *                example: comercial
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos la información del usuario creado.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al crear el nuevo usuario
   *        schema:
   *        type: json
   */
  router.post("/", checkToken,comerciales.create);
  //router.post("/",comerciales.create);
  // el primer usuario sin checkToken ,usuariobasico.
  // Obtenemos todos los usuarios (Comercial/Administador)
  /**
   * @swagger
   * /api/comerciales:
   *  get:
   *    summary: Obtener todos los de usuarios(Comercial/Administrador).
   *    tags: 
   *      - Usuario
   *    description:  Obtenemos todos los usuarios(Comercial/Administrador).
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos los usuarios(Comercial/Administrador).
   *        schema:
   *        type: json
   *      500:
   *        description: Error al obtener los usuarios.
   *        schema:
   *        type: json
   */
  router.get("/",checkToken, comerciales.findAll);
  // Retrieve all comerciales
  //Obtenemos todos los usuarios (Comercial/Administador)
  /**
   * @swagger
   * /api/comerciales/comercialByoptions:
   *  post:
   *    summary: Busquda de usuarios por filtro
   *    tags: 
   *      - Usuario
   *    description:  Obtenemos todos los usuarios , busquda por filtro.
   *    requestBody:
   *      required: false
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              nombre:
   *                type: string
   *                description: Nombre completo usuario
   *                example: Usuario Básico
   *              usuario:
   *                type: string
   *                description: nombre de usuario
   *                example: basico
   *              pwd:
   *                type: string
   *                description: password usuario
   *                example: usuariobasico
   *              email:
   *                type: string
   *                description: email usuario
   *                example: pedro@gmail.com
   *              role:
   *                type: string
   *                description: Rol usuario Comercial o Administrador
   *                example: comercial
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos los usuarios.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al obtener los usuarios..
   *        schema:
   *        type: json
   */
  router.post("/comercialByoptions",checkToken, comerciales.findAll);
  // Obtener usuario mediante Id del usuario.
  /**
   * @swagger
   * /api/comerciales/{id}:
   *  get:
   *    summary: Obtener informacion de un comercial-administrador
   *    tags: 
   *      - Usuario
   *    description: Obtenemos la informacion de un comercial-administrador.
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: id
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos la información del comercial.
   *        schema:
   *        type: json
   *      404:
   *        description: Usuario no encontrado.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al obtener la informacion del Comercial.
   *        schema:
   *        type: json
   */
  router.get("/:id",checkToken, comerciales.findOne);
  // Actualizar usuario con el Id del usuario.
  /**
   * @swagger
   * /api/comerciales/{id}:
   *  put:
   *    summary: Modificar comercial-administrador.
   *    tags: 
   *      - Usuario
   *    description: Modificar datos de comercial-administrador.
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: id
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos los datos del usuario modificado
   *        schema:
   *        type: json
   *      400:
   *        description: Usuario no encontrado.
   *        schema:
   *        type: json
   *      404:
   *        description: Los datos para actualizar no pueden estar vacios.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al modificar usuario.
   *        schema:
   *        type: json
   */
  router.put("/:id",checkToken, comerciales.update);
  // Borrar usuario mediante Id del usuairo.
  /**
   * @swagger
   * /api/comerciales/{id}:
   *  delete:
   *    summary: Eliminamos comercial-administrador.
   *    tags: 
   *      - Usuario
   *    description: eliminamos comercial-administrador.
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos la información del comercial y escribimos el token en SessionStorage.
   *        schema:
   *        type: json
   *      404:
   *        description: Error al borrar usuario , usuario no encontrado.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al eliminar usuario.
   *        schema:
   *        type: json
   */
  router.delete("/:id",checkToken, comerciales.delete);
  //Borrar todos los usuarios.
  /**
   * @swagger
   * /api/comerciales:
   *  delete:
   *    summary: Eliminamos todos los comerciales-administradores
   *    tags: 
   *      - Usuario
   *    description: eliminamos todos los comerciales-administradores.
   *    produces:
   *      - application/json
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos mensaje "Comerciales eliminados".
   *        schema:
   *        type: json
   *      500:
   *        description: Some error occurred while removing all Comerciales
   *        schema:
   *        type: json
   */
   router.delete("/:id",checkToken, comerciales.deleteAll);

  app.use("/api/comerciales", router);
};
