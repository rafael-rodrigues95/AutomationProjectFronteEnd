import { ImageMesa } from "../../../resources/images/ImageMesa";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";


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
                  <ImageMesa/>
                </Col>
                <Col>
                Acesse a Mesa de Operaões<br/>
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
