require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Event = require('../models/Event');

const eventData = {
  name: 'Naari Saman Awards 2026',
  date: new Date('2026-07-12'),
  venue: 'The Chancery Pavilion, Bengaluru',
  description: 'Naari Samman 2026 is an annual award ceremony organized by Media Vision Bengaluru to honor women who have made exceptional contributions across various fields such as arts, science, medicine, sports, and social service. The event celebrates inspiring women achievers and encourages future generations to contribute meaningfully to society. The ceremony is scheduled to be held on July 12, 2026, at The Chancery Pavilion, Bengaluru.',
  photos: [
    'https://res.cloudinary.com/dznfbr1ur/image/upload/v1781453469/Naree_Saman_Broucher_page-0001_f3do6c.jpg',
    'https://res.cloudinary.com/dznfbr1ur/image/upload/v1781453469/Naree_Saman_Broucher_page-0002_rtwimq.jpg',
    'https://res.cloudinary.com/dznfbr1ur/image/upload/v1781453469/Naree_Saman_Broucher_page-0003_fecd1w.jpg',
    'https://res.cloudinary.com/dznfbr1ur/image/upload/v1781453470/Naree_Saman_Broucher_page-0004_qq4pbq.jpg'
  ]
};

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Media-Vision-Bengaluru'
  });
  console.log('Connected to MongoDB');

  const existing = await Event.findOne({ name: eventData.name });
  if (existing) {
    console.log('Event already exists — updating it.');
    await Event.findByIdAndUpdate(existing._id, { $set: eventData });
    console.log('Updated:', eventData.name);
  } else {
    const event = new Event(eventData);
    await event.save();
    console.log('Created:', eventData.name);
  }

  await mongoose.disconnect();
  console.log('Done');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
