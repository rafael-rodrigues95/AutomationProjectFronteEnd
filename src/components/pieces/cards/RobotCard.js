import { Robot } from "../../../resources/images/ImageRobot";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";


let counts = setInterval(updated);

let upto = 2100;

function updated() {
  var count = document.getElementById("counter");
  count.innerHTML = ++upto;
  if (upto === 2503) {
      clearInterval(counts);
  }
}

function RobotCards() {
  return (
    <>
      <p>&nbsp;</p>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text>
            <Container>
              <Row>
                <Col xs={4}>
                  <Robot />
                </Col>
                <Col>
                  <h3 style={{ color: "#f7b538" }} id="counter"></h3>
                  SMSs enviados hoje
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default RobotCards;
