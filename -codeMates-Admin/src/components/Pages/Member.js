import { Container } from "react-bootstrap";
import "./LeoClub.css";
import Members from "./Members";
function Member() {
    return <>
    <Container className="mainContainer">
    <div className="LeoClubs mt-5">
          <h2>Our Team</h2>
          <Members />
          {/* <OmegaClubs /> */}
        </div>
      
    </Container>
    </>
}

export default Member;