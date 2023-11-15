import {Schema, model, connect, disconnect} from 'mongoose';
import { config } from 'dotenv';

config();

// MongoDB connection URL with username and password from environment variables
const mongoURL = `mongodb://my_mongo:27017/moviesdb`;

// Define a Movie schema
const movieSchema = new Schema({
  id: String,
  title: String,
  genre: String,
  rating: Number,
  streamingLink: String,
});

const userSchema = new Schema({
  id: String,
  email: String
})

// Define a Movie model
const Movie = model('Movie', movieSchema);
const User = model('User', userSchema);

async function seedMoviedata() {
  try {
    // Connect to MongoDB
    await connect(mongoURL);
    
    // Sample data
    const sampleMovies = [
      { id: '123', title: 'Movie 1', genre: 'Action', rating: 8.5, streamingLink: 'https://example.com/movie1' },
      { id: '456', title: 'Movie 2', genre: 'Drama', rating: 7.9, streamingLink: 'https://example.com/movie2' },
      // Add more sample data as needed
    ];

    // Create the 'movies' collection and insert sample data
    await Movie.insertMany(sampleMovies);

    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect from MongoDB after seeding
    await disconnect();
  }
}

async function seedUserData() {
  try {
    // Connect to MongoDB
    await connect(mongoURL);
    
    const userDatabase = [
      {
        id: '123', email: 'sandesh.bafna8@gmail.com'
      }
    ]
    // Create the 'movies' collection and insert sample data
    await User.insertMany(userDatabase)

    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect from MongoDB after seeding
    await disconnect();
  }
}

// Run the seed function
console.log('Inserting seed data')
seedMoviedata();
seedUserData();
