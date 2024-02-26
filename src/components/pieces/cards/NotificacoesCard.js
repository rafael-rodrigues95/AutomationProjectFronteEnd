import { ImageNotificacoes } from "../../../resources/images/ImageNotificacoes";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

let counts = setInterval(updated);

let upto = 1400;

function updated() {
  var count = document.getElementById("counter4");
  count.innerHTML = ++upto;
  if (upto === 1740) {
      clearInterval(counts);
  }
}

function NotificacoesCard() {
  return (
    <>
      <p>&nbsp;</p>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text>
            <Container>
              <Row>
                <Col xs={4}>
                  <ImageNotificacoes/>
                </Col>
                <Col>
                  <h3 style={{ color: "#899d78" }} id="counter4"></h3>
                  Pessoas notificadas
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default NotificacoesCard;
