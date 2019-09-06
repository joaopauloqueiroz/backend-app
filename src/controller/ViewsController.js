module.exports = {
  async index(req, res) {
    res.render("index.ejs");
  },
  async edit(req, res) {
    res.render("negation.ejs");
  }
};
