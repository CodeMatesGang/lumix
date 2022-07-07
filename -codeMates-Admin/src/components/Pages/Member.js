import { Container } from "react-bootstrap";
import "./LeoClub.css";
import Members from "./Members";
import Header from "../main components/Header";
import Footer from "../footer";
function Member() {
    return <>
<Header></Header>
    <Container className="mainContainer">
    <div className="LeoClubs mt-5">
          <h2>Our Team</h2>
          <Members />
          {/* <OmegaClubs /> */}
        </div>
      
    </Container>
    <Footer></Footer>
    </>
}

export default Member;