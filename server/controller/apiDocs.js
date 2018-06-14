import path from 'path';

const displayApiDocumentation = (req, res) => res.sendFile(path.resolve(__dirname, '../../UI/docs.html'));

export default displayApiDocumentation;
