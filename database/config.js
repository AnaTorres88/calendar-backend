const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN); //regresa una promesa
        console.log('DB online');
    }
    catch(error) {
        console.error(error)
        throw new Error('Error when trying to initialize database')
    }
}

module.exports = {dbConnection};

// Ya no es necesario esto en mongoose.connect
// {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true,
//     useCreateIndex: true
// }