import Club from "../models/ClubModel.js";
import path from "path";
import fs from "fs";

// CLUB
export const getClubs = async (req, res) => {
  try {
    const response = await Club.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getClubById = async (req, res) => {
  try {
    const response = await Club.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveClub = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const description = req.body.description;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res
      .status(422)
      .json({ msg: "Please upload .png or .jpg or.jpeg type. " });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Club.create({
        name: name,
        image: fileName,
        url: url,
        description: description,
      });
      res.status(201).json({ msg: "Club Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateClub = async (req, res) => {
  const club = await Club.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!club) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = club.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${club.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Club.update(
      { name: name, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Club Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteClub = async (req, res) => {
  const club = await Club.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!club) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${club.image}`;
    fs.unlinkSync(filepath);
    await Club.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Club Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
