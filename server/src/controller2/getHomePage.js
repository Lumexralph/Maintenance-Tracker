const getHomePage = (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'Welcome to Maintenance Tracker',
  });
};

export default getHomePage;

