import path from 'path';

const getHomePage = (req, res) => {
  // res.status(200).send({
  //   status: 'success',
  //   message: 'Welcome to Maintenance Tracker',
  // });
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
};

export default getHomePage;

