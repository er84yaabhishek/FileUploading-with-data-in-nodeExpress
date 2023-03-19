const express = require("express");
const app = express();
const multer = require("multer"); //default import
let env = require("dotenv");
env.config();

const storage = multer.diskStorage({
  //1.P:V

  //2.Methods
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    console.log(file);
    let randomNumber = Math.ceil(Math.random() * 10000);
    console.log(randomNumber);
    let filename = randomNumber + "" + file.originalname;

    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
//Lets create the post route

app.post("/fileupload", upload.single("myfile"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.status(200).json({
    msg: "File upload successfully",
  });
});

let port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log("the server is running on port" + port);
});
