const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  businessData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  websiteJson: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Website', websiteSchema);
