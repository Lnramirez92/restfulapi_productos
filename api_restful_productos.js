const Contenedor = require('./contenedor');
const express = require("express");
const { Router } = express;

const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const contenedor = new Contenedor('./assets/productos.json');

router.get("/", (req, res) => {
    res.send(contenedor.getAll());
});

router.get("/:id", (req, res) => {
    let id = parseInt(req.params.id, 10);
    res.send(contenedor.getById(id));
});

router.post("/", (req, res) => {
    let prod = req.body;
    let nuevaId = contenedor.save(prod);
    res.send({nuevaId: nuevaId});
});

router.put("/:id", (req, res) => {
    let prodId = req.params.id;
    let prod = req.body;
    contenedor.upload(prod, prodId);
    res.send(contenedor.getAll());
});

router.delete("/:id", (req, res) => {
    let prodId = parseInt(req.params.id, 10);
    contenedor.deleteById(prodId);
    res.send("Producto eliminado.");
});

app.use("/api/productos", router);

app.listen(8080);

// console.log(contenedor.getAll());
// const prodnuevo = {
//     "title": "Ojota",
//     "price": 200,
//     "thumbnail": "url de foto de ojota"
// }

// contenedor.upload(prodnuevo, 1);
// console.log(contenedor.getAll());