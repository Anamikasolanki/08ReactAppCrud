import React from "react";
import {
  Modal,
  Button,
  Form,
  FormGroup,
  FormLabel,
  Container,
  Table,
} from "react-bootstrap";
import { useState } from "react";

function Register() {
  const [show, setShow] = useState(true);
  const [allData, setallData] = useState([{}]);
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });
  const [buttonState, setButtonState] = useState(true);
  const [indexnum, setIndexnum] = useState(0);

  function getInputData(e) {
    let target = e.target;
    // console.log(target)
    let value = target.value;
    let key = target.name;
    // console.log(key + " = " + value)
    return setinput((old) => {
      return {
        ...old,
        [key]: value,
      };
    });
  }

  let temp = {};
  function getFormData(e) {
    e.preventDefault(); // for data stay.
    let form = e.target;
    // console.log(form);
    let formData = new FormData(form);
    // console.log(formData);
    // console.log(formData.get("name"));
    // console.log(formData.get("email"));
    // console.log(formData.get("password"));
    // console.log(formData.get("number"));
    // console.log(formData.get("image"));

    for (let data of formData.entries()) {
      // u can write enties() or not its ur choose.
      // console.log(data);
      let property = data[0];
      let value = data[1];
      // console.log(property + "=" + value);
      // console.log(property);
      // console.log(value);
      // console.log(typeof(value));

      if (typeof value == "object") {
        value = URL.createObjectURL(value);
        // console.log(value);
      }
      temp[property] = value;
      // console.log(temp)
    }
    return (
      setallData((old) => {
        return [...old, temp]; // ...old store the previos value and temp store the updated value wich help to display both value in our form details.
      }),
      setShow(false),
      setinput({
        name: "",
        email: "",
        password: "",
        number: "",
      })
    );
  }

  function insert(e) {
    e.preventDefault();
    // alert("insert")
    getFormData(e);
  }

  function update(e) {
    e.preventDefault();
    // alert("update")
    getFormData(e);
    // console.log(temp)
    // alert(indexnum)
    const tempdata = [...allData];
    tempdata[indexnum] = temp;
    // console.log(tempdata)
    return setShow(false), setallData(tempdata);
  }

  // Delete user function
  function deleteUser(index) {
    // console.log(index)
    let tempData = [...allData];
    // console.log(tempData) // before delete
    tempData.splice(index, 1);
    window.alert("Do u want to delete this data?");
    // console.log(tempData) // after delete
    return setallData(tempData);
  }

  //Edit function
  function editData(item) {
    // alert(item.index)
    // console.log(item);
    return (
      setShow(true),
      setinput(item),
      setButtonState(false),
      setIndexnum(item.index)
    );
  }

  function addButton() {
    return (
      setShow(true),
      setinput({
        name: "",
        email: "",
        password: "",
        number: "",
      }),
      setButtonState(true)
    );
  }

  // Table function
  function Tr({ item }) {
    return (
      <>
        <tr>
          <td>{item.index + 1}</td>
          <td>
            <img
              src={item.image}
              alt="1"
              width={50}
              height={50}
              className="rounded-circle"
            />
          </td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.password}</td>
          <td>{item.number}</td>
          <td className="d-flex justify-content-center">
            <Button className="me-lg-3" onClick={editData}>
              <i className="fa fa-edit"></i>
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteUser(item.index);
              }}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </td>
        </tr>
      </>
    );
  }

  return (
    <>
      <h1 className="text-center my-5">Registration details</h1>
      <Button
        className="position-absolute bottom-0 end-0 me-3 mb-3 rounded-circle"
        onClick={addButton}
      >
        <i className="fa fa-plus"></i>
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Registration Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={buttonState ? insert : update}>
            <FormGroup>
              <FormLabel>Full Name</FormLabel>
              <Form.Control
                onChange={getInputData}
                type="text"
                name="name"
                value={input.name}
                placeholder="Type your name"
                required
              />
            </FormGroup>
            <FormGroup className="mt-4">
              <FormLabel>Email</FormLabel>
              <Form.Control
                onChange={getInputData}
                type="email"
                name="email"
                value={input.email}
                placeholder="Type your Email"
                required
              />
            </FormGroup>
            <FormGroup className="mt-4">
              <FormLabel>Password</FormLabel>
              <Form.Control
                onChange={getInputData}
                type="password"
                name="password"
                value={input.password}
                placeholder="Type your password"
                required
              />
            </FormGroup>
            <FormGroup className="mt-4">
              <FormLabel>Contact Number</FormLabel>
              <Form.Control
                onChange={getInputData}
                type="number"
                name="number"
                value={input.number}
                placeholder="Enter Your Contact Number"
                required
              />
            </FormGroup>
            <FormGroup className="mt-4">
              <FormLabel>Profile Image</FormLabel>
              <Form.Control
                type="file"
                name="image"
                value={input.image}
                placeholder="Enter Your Image"
                required
              />
            </FormGroup>
            <FormGroup className="mt-4">
              {buttonState ? (
                <Button variant="info" type="submit">
                  Submit
                </Button>
              ) : (
                <Button variant="info" type="submit">
                  Update
                </Button>
              )}
            </FormGroup>
          </Form>
          {/* <p>{JSON.stringify(input)}</p> */}
        </Modal.Body>
      </Modal>

      {/* <p>{JSON.stringify(allData)}</p> */}

      <Container>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>SL.</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Contact Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((item, index) => {
              item["index"] = index;
              return <Tr item={item} key={index} />;
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Register;
