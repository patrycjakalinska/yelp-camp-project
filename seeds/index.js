const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 10) + 10;
    const camp = new Campground({
      author: "62e2b9a66b9f0106aa35a98f",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto error, ad delectus rerum consectetur iste quas. Praesentium beatae atque nulla ab! Placeat maiores labore iure quos corrupti quisquam soluta perspiciatis?",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/ddw3shtfu/image/upload/v1661243080/YelpCamp/byqgjhwp2gu7zdjcuus9.jpg",
          filename: "YelpCamp/byqgjhwp2gu7zdjcuus9",
        },
        {
          url: "https://res.cloudinary.com/ddw3shtfu/image/upload/v1661243084/YelpCamp/vh55lgjwkrf3hmpxj8x8.jpg",
          filename: "YelpCamp/vh55lgjwkrf3hmpxj8x8",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
