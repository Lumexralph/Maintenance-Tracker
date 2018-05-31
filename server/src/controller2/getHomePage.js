import path from 'path';

// const root = '../Maintenance-Tracker/UI/';

const getHomePage = (req, res) => {
  
  res.sendFile(path.resolve(__dirname, '../../../UI/index.html'));
};

export default getHomePage;

