import path from 'path';

const getHomePage = (req, res) => {
  return res.status(200).send({ message: 'Welcome to FixZit, a Maintenance Tracker' });  
};

export default getHomePage;

