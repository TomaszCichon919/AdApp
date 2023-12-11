// const User = require('../models/users.model');

// exports.getAll = async (req, res) => {
//   try {
//     res.json(await User.find());
//   }
//   catch(err) {
//     res.status(500).json({ message: err });
//   }
// };



// exports.getById = async (req, res) => {

//   try {
//     const userToSelect = await Ad.findById(req.params.id);
//     if(!adToSelect) res.status(404).json({ message: 'Ad not found' });
//     else res.json(adToSelect);
//   }
//   catch(err) {
//     res.status(500).json({ message: err });
//   }

// };

// exports.addNew = async (req, res) => {

//   try {
//   const { title, content, date, src, price, adress, seller } = req.body;
//   console.log(req.body);

//   const newAdd = new Add({ title, content, date, src, price, adress, seller });
//     await newAdd.save();
//     res.json({ message: 'OK' });

//   } catch(err) {
//     res.status(500).json({ message: err });
//   }
// };

// exports.edit = async (req, res) => {
//   try {
//       const { title, content, date, src, price, adress, seller } = req.body;

  
//     const adToUpdate = await Ad.findById(req.params.id);
//     if(adToUpdate) {
//       await Ad.updateOne({ _id: req.params.id }, { $set: { title, content, date, src, price, adress, seller }});
//       res.status(200).json({ message: 'OK' });
//     }
//    else res.status(404).json({ error: 'Add not found' });
//   }
//   catch(err) {
//     res.status(500).json({ message: err });
//   }

// };

// exports.delete = async (req, res) => {

//   try {
//     const adToDelete = await Ad.findById(req.params.id);
//     if(adToDelete) {
//       await Ad.deleteOne({ _id: req.params.id });
//       res.status(200).json({ message: 'Ad deleted successfully' });
//     }
//     else res.status(404).json({ message: 'Not found...' });
//   }
//   catch(err) {
//     res.status(500).json({ message: err });
//   }

// };




