const express= require('express');
const app= express();
const cors=require('cors');
const mongoose= require('mongoose')
const drinkRouter= require('./routes/drink')
const refundRouter= require('./routes/refund')
const resetRouter= require('./routes/reset')
const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express')
const port=process.env.PORT|| 2000;
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
mongoose.connect("mongodb+srv://xanxit:xanxit@cluster0.qpkmw.mongodb.net/test", 
{ useNewUrlParser : true , 
  useUnifiedTopology: true ,useCreateIndex : true });

  mongoose.connection.on("connected", function () {
    console.log("mongo db connected");
  });
  mongoose.set('useFindAndModify', false);
  const swaggerOptions={
    definition: {
      openapi: "3.0.0",
      info: {
        title: "REST API",
        version: "1.0.0",
        description: "A simple Express API",
      },
      servers: [
        {
          url: "http://localhost:2000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  const swaggerDocs= swaggerJsDoc(swaggerOptions);
  app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  



  app.use('/api',drinkRouter);
  app.use('/api',refundRouter);
  app.use('/api',resetRouter);

app.listen(port,()=>{console.log(`Listening on port ${port}`)});
