import { Robot } from "../../../resources/images/ImageRobot";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";


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
                  <h3 style={{ color: "#f7b538" }}>1740</h3>
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
