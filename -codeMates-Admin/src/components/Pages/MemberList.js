import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";
import ConfirmDialog from "./ConfirmDialog";
import "./OmegaClubs.css";

function MemberList() {
  const [memberList, setMemberList] = useState([]);
  const getList = async () => {
    const response = await Axios.get("http://localhost:5000/member");
    const memberList = await response.data;
    setMemberList(memberList);
  };
  useEffect(() => {
    getList();
  }, []);

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  const idMemberRef = useRef();
  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const deleteMember = (id) => {
    handleDialog("Are you sure you want to delete?", true);
    idMemberRef.current = id;
  };
  const areUSureDelete = (choose) => {
    if (choose) {
      Axios.delete(`http://localhost:5000/member/${idMemberRef.current}`);
      handleDialog("", false);
      //getList
      window.location.reload(false);
    } else {
      handleDialog("", false);
    }
  };
  return (
    <>
      <div className="omegaContainer">
        <div className="omegaclub d-flex justify-content-end">
          <br />
          <Button
            variant="light"
            as={Link}
            to="/adm"
            className="editDeleteAddBtn"
          >
            <BsFillPlusCircleFill
              style={{ color: "green", fontSize: "1.5em" }}
            />
          </Button>
        </div>
      </div>
      <Row>
        {memberList.map((listItem) => {
          const { id, name, url } = listItem;

          return (
            <Col lg={3} key={id} className="leoCol mt-4">
              <h4>{name}</h4>
              <img src={url} alt={name} height="200px" className="leoImage" />
              <div>
                <Button
                  variant="light"
                  className="mt-3 editDeleteAddBtn"
                  as={Link}
                  to={`/editm/${id}`}
                >
                  <BsPencilSquare
                    style={{ color: "blue", fontSize: "1.5em" }}
                  />
                </Button>{" "}
                <Button
                  variant="light"
                  className="mt-3 editDeleteAddBtn"
                  onClick={() => {
                    deleteMember(id);
                  }}
                >
                  <BsFillTrashFill
                    style={{ color: "red", fontSize: "1.5em" }}
                  />
                </Button>{" "}
              </div>
              <br />
              <Button
                variant="success"
                as={Link}
                to={`/member/${id}`}
                className="w-50 mt-3"
              >
                Read&nbsp;More...
              </Button>{" "}
            </Col>
          );
        })}
      </Row>
      {dialog.isLoading && (
        <ConfirmDialog onDialog={areUSureDelete} message={dialog.message} />
      )}
    </>
  );
}

export default MemberList;
