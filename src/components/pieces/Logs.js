import React from 'react';

class Logs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            log: [],
        };
    }

    componentDidMount() {
        // fetch("/services/PontoWebADM/wsdl")
        // .then((response) => response.text())
        // .then((data) => {
        //         this.setState({
        //             log: data.log,
        //         })
        //         console.log("Respota Barramento: ", data)
        //     }
        // )
    }


    render() {
        return (
            <div className="container">
                {/* {this.state.log.map((dynamicData, key) =>
                    <div>

                        <table>
                            <tr>
                                <th>Title</th>
                                <th>Release Year</th>
                            </tr>
                            <tr>
                                <td>{}</td>
                                <td>{}</td>
                            </tr>
                        </table>
                    </div>
                )} */}
            </div>
        );
    }
}

export default Logs;