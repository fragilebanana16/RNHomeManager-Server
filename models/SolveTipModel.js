const mongoose = require('mongoose');

const solveTipSchema = new mongoose.Schema({
    description: {type: String, required: true, trim: true},
    solution: [{
      type: String,
      trim: true,
      validate: {
        validator: function(s) {
          return s && s.length>0;
        },
        message: 'A solve tip should have at least one solution.'
      }
    }],
    category: {
      type: String, 
      required: true,
      enum: ['utility', 'digital', 'skill', 'other'],
      trim: true
    },
    recordDate: {type: Date, default:Date.now},
    solvedRecords: [{conclusion: String, solveDate: {type: Date, default:Date.now}, voteForThisTime: Number}],
    updatedDate: {type: Date, default:Date.now},
    imageNameLists: [String],
  });
  
  const SolveTip = mongoose.model('SolveTip', solveTipSchema);

  exports.SolveTip = SolveTip;