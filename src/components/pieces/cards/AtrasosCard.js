import { ImageAtraso } from "../../../resources/images/ImageAtraso";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";


function AtrasosCard() {
  return (
    <>
      <p>&nbsp;</p>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text>
            <Container>
              <Row>
                <Col xs={4}>
                  <ImageAtraso />
                </Col>
                <Col>
                  <h3 style={{ color: "#F22727" }}>1740</h3>
                  Atrasos detectados
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default AtrasosCard;
