import React, { Component } from "react";
import {Button, ButtonGroup, Container, AppNavBar, Table} from "react-bootstrap";
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';



class RoboList extends Component {

    async remove (id){
        await fetch('/nomeDaRota/${id}', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedRobots = [...this.state.robos].filter( i => i.id !== id);
            this.setState({robos: updatedRobots});
        })
    }

    render() {
        const {robos, isLoading} = this.state;

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const roboList = robos.map(robo => {
        return <tr key={robo.id}>
            <td style={{whiteSpace: 'nowrap'}}>{robo.name}</td>
            <td>{robo.email}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/robos/" + robo.id}>Editar</Button>
                    <Button size="sm" color="danger" onClick={() => this.remove(robo.id)}>Deletar</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavBar/>
            <Container fluid>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/robos/new">Add robo</Button>
                </div>
                <h3>robos</h3>
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
                    <tbody>
                    {roboList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
    }
}

export default RoboList 