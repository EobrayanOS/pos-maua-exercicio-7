const express = require("express");
const uuid = require("uuid");
const cors = require('cors')

const livros = [];
const livrosRouter = express.Router();

////////////////////////////////////////////////////////////////////////////
//                GET

livrosRouter.get("/", (req, res) => {
  res.json(livros);
});

////////////////////////////////////////////////////////////////////////////
//                POST

livrosRouter.post("/", (req, res) => {
  const livro = {
    id: uuid.v4(),
    titulo: req.body.titulo,
    edicao: req.body.edicao,
    autor: req.body.autor,
  };

  livros.push(livro);

  res.status(201).json(livro);
});

////////////////////////////////////////////////////////////////////////////
//                PUT

livrosRouter.put("/:id", (req, res) => {
  const livroId = req.params.id;
  const livroIndex = livros.findIndex((livro) => livro.id === livroId);
  
  if (livroIndex === -1) {
    return res.status(404).json({ message: "Livro não encontrado" });
  }
  
  const livro = livros[livroIndex];

  livro.titulo = req.body.titulo;
  livro.edicao = req.body.edicao;
  livro.autor = req.body.autor;

  res.json(livro);
});

////////////////////////////////////////////////////////////////////////////
//                DELETE

livrosRouter.delete("/:id", (req, res) => {
  const livroId = req.params.id;
  const livroIndex = livros.findIndex((livro) => livro.id === livroId);
  
  if (livroIndex === -1) {
    return res.status(404).json({ message: "Livro não encontrado" });
  }
  
  livros.splice(livroIndex, 1);

  res.json({ message: "Livro removido com sucesso" });
});

////////////////////////////////////////////////////////////////////////////

const app = express();
app.use(express.json())
app.use(cors())
app.use("/livros", livrosRouter);
app.listen(3000);
