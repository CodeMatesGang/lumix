import Member from "../models/MemberModel.js";
import path from "path";
import fs from "fs";


export const getMember = async (req, res) => {
  try {
    const response = await Member.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMemberId = async (req, res) => {
  try {
    const response = await Member.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const savemember = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const description = req.body.description;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res
      .status(422)
      .json({ msg: "Please upload .png or .jpg or.jpeg type. " });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/image/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Member.create({
        name: name,
        image: fileName,
        url: url,
        description: description,
      });
      res.status(201).json({ msg: "Member Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateMember = async (req, res) => {
  const member = await Member.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!member) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = member.image;
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

    const filepath = `./public/image/${member.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/image/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;

  try {
    await Member.update(
      { name: name, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Member Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMember = async (req, res) => {
  const member = await Member.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!member) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/image/${member.image}`;
    fs.unlinkSync(filepath);
    await Member.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Member Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
