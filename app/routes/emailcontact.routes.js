
module.exports = app => {
  const emailcontact = require("../controllers/emailcontact.controller.js");
  const { checkToken } = require('../helpers/middlewares');

  var router = require("express").Router();

  // Crear nuevo contacto.
  /**
   * @swagger
   * /api/emailcontact:
   *  post:
   *    summary: Crear registor de nuevo contacto.
   *    tags: 
   *      - EmailContact
   *    description:  Crear registor de nuevo contacto.
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
   *              message:
   *                type: string
   *                description: Mensaje formulario
   *                example: basico
   *              email:
   *                type: string
   *                description: email contacto
   *                example: usuariobasico
   *              telefono:
   *                type: string
   *                description: telefono contacto
   *                example: pedro@gmail.com
   *              empresa:
   *                type: string
   *                description: empresa contacto
   *                example: comercial
   *              provincia:
   *                type: string
   *                description: provincia contacto
   *                example: comercial
   *              modalidad:
   *                type: string
   *                description: modalidad Alquiler/Coworking
   *                example: comercial 
   *              puestos:
   *                type: string
   *                description: número de puestos
   *                example: comercial 
   *              comercial:
   *                type: string
   *                description: comercial asignado
   *                example: comercial 
   *              oficina:
   *                type: string
   *                description: Oficina interés
   *                example: comercial 
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Devolvemos el nuevo registro y enviamos email al cliente y comercial asignado.
   *        schema:
   *        type: json
   *      400:
   *        description: El contenido no puede estar vacio!.
   *        schema:
   *        type: json
   *      404:
   *        description: Comercial/Administrador no encontrado.
   *        schema:
   *        type: json
   *      500:
   *        description: Error al crear contacto.
   *        schema:
   *        type: json
   */
  router.post("/", checkToken,emailcontact.create);
  // Borrar todos los contactos.
  /**
   * @swagger
   * /api/emailcontact:
   *  delete:
   *    summary: Eliminar todos los contactos
   *    tags: 
   *      - EmailContact
   *    description: Eliminar todos los contactos de la base de datos.
   *    produces:
   *      - application/json
   *    security:
   *	     - bearerAuth: []
   *    responses:
   *      200:
   *        description: Mensaje borrado con éxito.
   *        schema:
   *        type: json
   *      500:
   *        description: Algún eror ocurrió mientras se intentaba borrar los contactos.
   *        schema:
   *        type: json
   */
  router.delete("/", checkToken,emailcontact.deleteAll);

  app.use("/api/emailcontact", router);
};
