import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "react-bootstrap";
// import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import RoboService from "../services/RoboService";


class RoboList extends Component {
  constructor(props) {
    super(props);
    this.state = { robos: [] };
    this.addRobo = this.addRobo.bind(this);
  }



  componentDidMount() {
    RoboService.getRobos().then((response) =>
      this.setState({ robos: response.data })
    );
  }

  addRobo(){
    this.props.history.push('/criar')
    document.location.reload()
  }

  render() {
    //     const {robos, isLoading} = this.state;

    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }

    const roboList = this.state.robos.map((robo) => {
      return (
        <tr>
          <td>{robo.id}</td>
          <td style={{ whiteSpace: "nowrap" }}>{robo.nome}</td>
          <td>{robo.dtExecutar}</td>
          <td>{robo.descricao}</td>
          <td>{robo.ativo}</td>
          <td>
            <ButtonGroup>
              {/* <Button size="sm" color="primary" tag={Link} to={"/robos/" + robo.id}>Editar</Button> */}
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(robo.id)}
              >
                Deletar
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            {/* <Button color="success" tag={Link} to="/robos/new">Add robo</Button> */}
          </div>
          <h3>Lista dos Robôs</h3>
          <button className="btn btn-primary" onClick={this.addRobo}>
            Adicionar Robô
          </button>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="16%">Id</th>
                <th width="16%">Descrição</th>
                <th width="16%">Nome</th>
                <th width="16%">Ativo</th>
                <th width="16%">Data Execução</th>
                <th width="20%">Actions</th>
              </tr>
            </thead>
            <tbody>{roboList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default RoboList;
