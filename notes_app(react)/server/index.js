const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const NoteSchema = require("./schemas/note");

const Note = mongoose.model("Note", NoteSchema);

mongoose.connect('mongodb://localhost/notes');

mongoose.connection.on("open", () => {
  console.log("Connected!!!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:8090'}));

app.route('/notes')
  .get((request, response) => {
    Note.find({}, (err, data) => {
         if(err)
            return response.status(500).send({
              error: "Can not get notes"
            });
        response.send(data);
      });
  })

  .post((req, res) => {
    const title = req.body.title ? req.body.title.toLowerCase().trim() : null;
    const description = req.body.description ? req.body.description.trim() : null;
    const date = new Date();
    
    Note.create({ title, description, date }, (err, data) => {
      if(err) {
        return res.status(500).send({
          error: "Can not save note"
        });
      }
          
      res.status(200).send(data);
    });
  });

  app.route('/notes/:id')
    .get((request, response) => {
      const _id = request.params.id;

      Note.findById({ _id }, (err, data) => {
        if(err) {
          return response.status(500).send({
            error: "Can get note"
          });
        }
        response.status(200).send(data);
      })
    })

    .delete((request, response) => {
      const _id = request.params.id;

      Note.findByIdAndRemove({ _id }, (err, data) => {
        if(err) {
          return response.status(500).send({
            error: "Can delete note"
          });
        }
        response.status(200).send(data);
      });
    })

    .patch((request, response) => {
      const title = request.body.title ? request.body.title.toLowerCase().trim() : null;
      const description = request.body.description ? request.body.description.trim() : null;
      const _id = request.params.id;

      Note.findByIdAndUpdate(_id, { $set: { title,  description }}, { new: true }, function (err, data) {
        if(err) {
          return response.status(500).send({
            error: "Can save note"
          });
        }
        response.send(data);
      });
    });
  

app.listen(8000, () => {
  console.log('Server is up and running on port 8000');
});