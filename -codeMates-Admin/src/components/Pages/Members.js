import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import "./OmegaClubs.css";
import Header from "../main components/Header";
import Footer from "../footer";
function Members() {
  const [memberList, setMemberList] = useState([]);

  const getList = async () => {
    const response = await Axios.get("http://localhost:5000/member");
    const memberList = await response.data;
    setMemberList(memberList);
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <>
    
      <div className="omegaContainer"></div>
      <Row>
        {memberList.map((listItem) => {
          const { id, name, url } = listItem;

          return (
            <Col lg={4} key={id} className="leoCol mt-4">
            <div className="img">
              <img src={url} alt={name} height="200px" className="memberImage" />
              </div>
              
              <h4>{name}</h4>
              <br />
              <Button
                variant="success"
                as={Link}
                to={`/member/${id}`}
                className="w-25 mt-3"
              >
                Read&nbsp;More...
              </Button>{" "}
            </Col>
          );
        })}
      </Row>
 
    </>
  );
}

export default Members;