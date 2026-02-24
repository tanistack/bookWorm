const mongoose = require('mongoose')

const connectDB = async () => {

  try {
    const conn = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('Database connection failed:')
    console.error(error.message)

    // Exit app if DB fails
    process.exit(1)
  }
}












module.exports = connectDB;