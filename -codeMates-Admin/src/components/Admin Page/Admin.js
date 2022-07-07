// import { Container } from "react-bootstrap";
// import ClubList from "../Pages/ClubList";
// import RepliesOfContactUs from "./RepliesOfContactUs";
// import MemberList from "../Pages/MemberList";
// import "./Admin.css";
// function Admin() {
//   return (
//     <>
//       <Container>
//         <h1 className="text-center mt-4">Admin panel</h1>
//         <hr />
//         <div>
//           <h2>Our Leo Clubs</h2>
//           <ClubList />
//         </div>
//         <hr />
//         <div>
//           <h2>Feedbacks</h2>
//           <RepliesOfContactUs />
//         </div>
//         <div>
//           <h2>Members</h2>
//           <MemberList />
//         </div>
//       </Container>
//     </>
//   );
// }

// export default Admin;

import { Container } from "react-bootstrap";
import ClubList from "../Pages/ClubList";
import RepliesOfContactUs from "./RepliesOfContactUs";
import "./Admin.css";
import MemberList from "../Pages/MemberList";
import AdminNavbar from "./AdminNavbar";
function Admin() {
  return (
    <>
    <AdminNavbar />
      <Container className="adminContainer">
        <h1 className="text-center mt-5">Admin panel</h1>
        <hr />
        <div className="adminBox mx-4 my-4 p-3">
          <h2 className="text-center mt-5">Our Leo Clubs</h2>
          <ClubList />
        </div>
        <div className="adminBox mx-4 my-4 p-3">
          <h2 className="text-center mt-5">Feedbacks</h2>
          <RepliesOfContactUs />
        </div>
        <div className="adminBox mx-4 my-4 p-3">
          <h2 className="text-center mt-5">Members</h2>
          <MemberList />
        </div>
      </Container>
    </>
  );
}

export default Admin;
