require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Team = require('../models/Team');

const updates = [
  {
    name: 'Nanda',
    image: 'https://res.cloudinary.com/dznfbr1ur/image/upload/v1781451542/Nanda_Balihalimath_Co-ordinator_xjiojy.jpg'
  },
  {
    name: 'Mahantesh S Hiremath',
    image: 'https://res.cloudinary.com/dznfbr1ur/image/upload/v1781451542/Mahantesh_Hiremath_Secretary_ioszxc.jpg'
  },
  {
    name: 'Rekha Hiremath',
    image: 'https://res.cloudinary.com/dznfbr1ur/image/upload/v1781451542/Rekha_Hiremath_CEO_ir5xq2.jpg'
  }
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Media-Vision-Bengaluru'
  });
  console.log('Connected to MongoDB');

  for (const { name, image } of updates) {
    const result = await Team.findOneAndUpdate(
      { name: { $regex: new RegExp(name, 'i') } },
      { $set: { image, updatedAt: new Date() } },
      { new: true }
    );
    if (result) {
      console.log(`Updated: ${result.name}`);
    } else {
      console.log(`Not found: ${name}`);
    }
  }

  await mongoose.disconnect();
  console.log('Done');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
