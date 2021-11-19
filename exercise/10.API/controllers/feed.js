const { validationResult } = require("express-validator");
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: 1,
        title: "first Posts",
        content: "THis is the first posts",
        imageUrl: "images/duck.png",
        creator: {
          name: "Nishanth",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.addPosts = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    res.status(422).json({
      error: validationError.array(),
      message: false,
    });
  }
  res.status(201).json({
    message: "Post Created Successfully!!",
    post: {
      id: new Date().toISOString(),
      title: title,
      content: content,
      creator: {
        name: "Nishanth",
      },
      createdAt: new Date(),
    },
  });
};
