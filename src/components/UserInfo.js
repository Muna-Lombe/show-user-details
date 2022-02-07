import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import {getUsers} from '../services/retrieveUserInfo.js'

export const UserInfo = () => {
  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetName: "",
    streetNumber: "",
    city: "",
    country: "",
  });
  const url = 'https://randomuser.me/api/?results=10';
  
  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    const user = userData.find((user) => user.login.uuid === id);
    setModalData({
      firstName: user.name.first,
      lastName: user.name.last,
      email: user.email,
      phone: user.phone,
      streetName: user.location.street.name,
      streetNumber: user.location.street.number,
      city: user.location.city,
      country: user.location.country,
    });
    setShow(true);
  };

  const loadUserData = async () => {
    const data = await getUsers(url);
    setUserData(data.results);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  if (!userData) return "";

  return (
    <Row className="justify-content-center">
      {userData.map((user) => (
        <Card
          key={user.login.uuid}
          className="m-2 shadow-sm p-3 mb-5 bg-white rounded"
          style={{ width: "18rem" }}
        >
          <Card.Img variant="top" src={user.picture.large} />
          <Card.Body className="d-flex flex-column">
            <Card.Title>{`${user.name.first} ${user.name.last}, ${user.dob.age}`}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{`${user.location.city}, ${user.location.country}`}</Card.Subtitle>
            <Card.Text>{user.login.username}</Card.Text>
            <Button
              className="mt-auto"
              variant="primary"
              onClick={() => handleShow(user.login.uuid)}
            >
              View Contact Details
            </Button>
          </Card.Body>
        </Card>
      ))}

      {modalData && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalData.firstName} {modalData.lastName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Email: {modalData.email}</Modal.Body>
          <Modal.Body>Phone: {modalData.phone}</Modal.Body>
          <Modal.Body>
            Address: {modalData.streetNumber} {modalData.streetName} street,{" "}
            {modalData.city}, {modalData.country}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Row>
  );
};
