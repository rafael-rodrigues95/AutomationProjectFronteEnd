import { Robot } from "../../../resources/images/ImageRobot";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { ImageAreaEmp } from "../../../resources/images/ImageAreaEmp";


function AreaEmpCard() {
  return (
    <>
      <p>&nbsp;</p>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text>
            <Container>
              <Row>
                <Col xs={4}>
                  <ImageAreaEmp/>
                </Col>
                <Col>
                  Acesse a Área do Empregado<br/>
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default AreaEmpCard;
