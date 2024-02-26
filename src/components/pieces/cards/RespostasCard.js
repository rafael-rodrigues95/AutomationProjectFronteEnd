import { ImageRespostas } from "../../../resources/images/ImageRespostas";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

let counts = setInterval(updated);

let upto = 1440;

function updated() {
  var count = document.getElementById("counter3");
  count.innerHTML = ++upto;
  if (upto === 1840) {
      clearInterval(counts);
  }
}

function RespostasCard() {
  return (
    <>
      <p>&nbsp;</p>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text>
            <Container>
              <Row>
                <Col xs={4}>
                  <ImageRespostas/>
                </Col>
                <Col>
                  <h3 style={{ color: "#f0bcd4" }} id="counter3"></h3>
                  Empregados resp.
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default RespostasCard;
