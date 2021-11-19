exports.success = (res, data) => {
  res.status(200).json({
    status: true,
    data,
  });
};

exports.failed = (res, error) => {
  res.status(500).json({
    status: false,
    error,
  });
};
