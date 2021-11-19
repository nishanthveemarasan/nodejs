exports.success = (res, data, status) => {
  res.status(status).json({
    status: true,
    data: data,
  });
};

exports.failed = (res, data, status) => {
  res.status(status).json({
    status: false,
    error: data,
  });
};
