const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  contact: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String }
  },
  skills: [String],
  languages: [String],
  certifications: [String],
  summary: { type: String, required: true },
  workExperience: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      duration: { type: String, required: true },
      responsibilities: [String]
    }
  ],
  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      year: { type: String }
    }
  ],
  projects: [
      {
      title: { type: String},
      description: { type: String },
      link: { type: String }
      }
      ],
  layout: { 
    type: String, 
    required: true, 
     // Restrict to specific layouts
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User model
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);
