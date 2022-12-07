
// connect to database
const connectDatabase = () => {
	try {
		console.log(process.env.MONGO_URI)
		const connection = mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log(`MongoDB Connected: ${connection.host}`);
	} catch (err) {
		// log the error incase of any then exit execution
		console.error(err);
		process.exit(1);
	}
};

module.exports = connectDatabase;

const mongoose = require('mongoose')