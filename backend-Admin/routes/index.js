import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  getClubs,
  getClubById,
  saveClub,
  updateClub,
  deleteClub,
} from "../controllers/ClubController.js";
import {
  getContactUs,
  getContactUsById,
  saveContactUs,
  updateContactUs,
} from "../controllers/ContactUsController.js";

import {
  deleteMember,
  getMember,
  getMemberId,
  savemember,
  updateMember,
} from "../controllers/MemberController.js";

const router = express.Router();
// Authentication
router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

// Club
router.get("/clubs", getClubs);
router.get("/clubs/:id", getClubById);
router.post("/clubs", saveClub);
router.patch("/clubs/:id", updateClub);
router.delete("/clubs/:id", deleteClub);

// Contact US
router.get("/contactus", getContactUs);
router.get("/contactus/:id", getContactUsById);
router.post("/contactus", saveContactUs);
router.patch("/contactus/:id", updateContactUs);

//Member
router.get("/member", getMember);
router.get("/member/:id", getMemberId);
router.post("/member", savemember);
router.patch("/member/:id", updateMember);
router.delete("/member/:id", deleteMember);
export default router;
