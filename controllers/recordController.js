const Record = require('../models/recordModel');
const { validationResult } = require('express-validator');

const createRecord = async (req, res) => {
  const record = req.body;
  const errors = validationResult(req);
  const user = req.user._id.toString();

  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    // creates a new record with an image path
    const createdRecord = await Record.create({
      ...record,
      userId: user,
    });

    return res.status(200).json({ message: createdRecord });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Unable to create record ' + error.message });
  }
};

const userRecords = async (req, res) => {
  const { userId } = req.params;
  const user = req.user;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  if (userId !== user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  try {
    const records = await Record.find({ userId: userId });

    if (records && records.length < 1) {
      return res.status(400).json({ message: 'No records found' });
    }
    return res.status(200).json({ message: records });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRecord,
  userRecords,
};
