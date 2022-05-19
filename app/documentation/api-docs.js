"use strict";

const express=require ("express");
const app=express();
const swaggerJsDoc=require("swagger-jsdoc");
const swaggerUI=require("swagger-ui-express");

//Swagger documentation
const swaggerOptions = {
    definition:  {
        openapi: '3.0.3',
        info: {
            version: '1.0.0"',
            title: 'Documentación API Rest OficinasCoworking',
            description: 'Uso docuemntación API Rest OficinasCoworking'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
              },
            }
        },
        security: [{
          bearerAuth: []
        }],
        
    },
     //APIS a documentar
     apis: ['./app/routes/*.js'],

} ;

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use ("/",swaggerUI.serve,swaggerUI.setup(swaggerDocs));

module.exports = app;