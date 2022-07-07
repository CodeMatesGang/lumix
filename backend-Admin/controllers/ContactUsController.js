import ContactUs from "../models/ContactUsModel.js";

// CONTACTUS_REPLY
export const getContactUs = async (req, res) => {
  try {
    const response = await ContactUs.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactUsById = async (req, res) => {
  try {
    const response = await ContactUs.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveContactUs = async (req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;
  const message = req.body.message;
  const replyStatus = 0;
  try {
    await ContactUs.create({
      fName: fName,
      lName: lName,
      email: email,
      message: message,
      replyStatus: replyStatus,
    });
    res.status(201).json({ msg: "Reply Created Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateContactUs = async (req, res) => {
  const contactus = await ContactUs.findOne({
    where: {
      id: req.params.id,
    },
  });

  const replyStatus = req.body.replyStatus;

  try {
    await Club.update(
      { replyStatus },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    console.log(id);
    console.log("dddddddddddddddddddddddddddddddddddd");
    res.status(200).json({ msg: "Contact us Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
    console.log("sssssssssssssssssssssssssssssss");
    // console.console.log(id);
  }
};
