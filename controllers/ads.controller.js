const Ad = require('../models/ads.model');
const getImageFileType = require('../utlis/getImageFileType');
const fs = require('fs');




exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};



exports.getById = async (req, res) => {

  try {
    const adToSelect = await Ad.findById(req.params.id);
    if(!adToSelect) res.status(404).json({ message: 'Ad not found' });
    else res.json(adToSelect);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};


exports.addNew = async (req, res) => {

  try {
  const { title, content, date, price, adress, seller } = req.body;
  const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

  if (title && typeof title === 'string' && content && typeof content === 'string' && date && 
  price && adress && seller && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {


  const newAdd = new Ad({ title, content, date, photo: req.file.filename, price, adress, seller });
    await newAdd.save();
    res.json({ message: 'OK' });

  } else {
    if (req.file) {
      fs.unlinkSync('./public/uploads/' + req.file.filename);
  }
  res.status(400).send({ message: 'Bad request' });
  }

  } catch(err) {
    res.status(500).json({ message: err });
  }
};

// exports.edit = async (req, res) => {
//   try {
//       const { title, content, date, photo, price, adress, seller } = req.body;

  
//     const adToUpdate = await Ad.findById(req.params.id);
//     if(adToUpdate) {
//       await Ad.updateOne({ _id: req.params.id }, { $set: { title, content, date, photo, price, adress, seller }});
//       res.status(200).json({ message: 'OK' });
//     }
//    else res.status(404).json({ error: 'Add not found' });
//   }
//   catch(err) {
//     res.status(500).json({ message: err });
//   }

// };

exports.edit = async (req, res) => {
  try {
    const { title, content, date, price, adress, seller } = req.body;
    const adToUpdate = await Ad.findById(req.params.id);

    if (!adToUpdate) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    if (req.file) {

      if (adToUpdate.photo) {
        fs.unlinkSync('./public/uploads/' + adToUpdate.photo);
      }

      adToUpdate.photo = req.file.filename;
    }

    adToUpdate.title = title || adToUpdate.title;
    adToUpdate.content = content || adToUpdate.content;
    adToUpdate.date = date || adToUpdate.date;
    adToUpdate.price = price || adToUpdate.price;
    adToUpdate.adress = adress || adToUpdate.adress;
    adToUpdate.seller = seller || adToUpdate.seller;

    await adToUpdate.save();

    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {

  try {
    const adToDelete = await Ad.findById(req.params.id);
    if(adToDelete) {
      await Ad.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Ad deleted successfully' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.searchAds = async (req, res) => {
  try {
    const searchPhrase = req.params.searchPhrase;

    const regex = new RegExp(searchPhrase, 'i');

    const ads = await Ad.find({ title: regex });

    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};