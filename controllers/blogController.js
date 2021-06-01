const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: 1 })
    .then((results) => {
      res.render("index", { title: "All your blogs", blogs: results });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("details", { title: "Blog details", blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Create a new blog" });
};

const blog_create_post = (req, res) => {
  console.log(req.body);

  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
  });

  blog
    .save()
    .then((results) => {
      console.log("element saved");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
