const Customer = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    //Validar el request
    if(!req.body){
        res.status(400).send({
            message: "El contenido no puede estar vacio"
        });
    }
    //Crea el cliente
    const customer = new Customer({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    });

    //Guarda al cliente en la base de datos

    Customer.create(customer, (err, data) =>{
        if(err)
        res.status(500).send({
            message:
                err.message || "Algunos errores se crearon al crear al cliente"
        });
        else res.send(data);
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Customer.getAll((err, data) =>{
      if(err)
      res.status(500).send({
          message:
          err.message || "Algunos errores ocurrieron al recuperar los clientes"
      });
      else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err,data)=>{
        if(err){
            if (err.kind === "No encontrado"){
                res.status(400).send({
                    message: "No se encontró el cliente con el id ${req.params.customerId}."
                });
            }else{
                res.status(500).send({
                    message: "Error al recuperar al cliente con el Id "+ req.params.customerId
                });
            }
        }else res.send(data);
    });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  //Validar el request
  if(!req.body){
      res.status(400).send({
          message: "El contenido no puede estar vacio"
      });
  }

  Customer.updateById(
      req.params.customerId,
      new Customer(req.body),
      (err,data) =>{
        if(err){
        if(err.kind === "not found"){
              res.status(404).send({
                message: "No se encontró el cliente con el id ${req.params.customerId}."
              });
        }else{
             res.status(500).send({
                 message: "Error al actualizar el cliente con el id" + req.params.customerId
             });
        }
      }else res.send(data);
    }
  );
};
// Delete a Customer with the specified customerId in the request

exports.delete = (req, res) => {
    Customer.remove(req.params.customerId, (err,data)=>{
        if(err){
            if(err.kind === "not found"){
                res.status(404).send({
                    message: "No se encontró el cliente con el id %{req.params.customerId}"
                });
            }else{
                res.status(500).send({
                    message: "No se puede eliminar el cliente con el id"+ req.params.customerId
                });
            }
        }else res.send({ message: "El cliente se eliminó correctamente"});
    });
  
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.removeAll((err,data)=>{
      if(err)
      res.status(500).send({
          message:
          err.message || "Algunos errores ocurrieron mientras eliminamos a los clientes"
      });
      else res.send({ message: "Todos los clientes fueron eliminados correctamente"});
  });
};