// import db from '../db/index';

const getHomePage = (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'Welcome to Maintenance Tracker',
  });
};

export default getHomePage;


// db.query('SELECT * FROM Student')
//     .then(result => res.status(200).send(result))
//     .catch(err => res.status(404).send(err));