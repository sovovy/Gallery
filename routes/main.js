module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("main/index");
  });
  app.get("/upload", (req, res) => {
    res.render("upload/index");
  });
};