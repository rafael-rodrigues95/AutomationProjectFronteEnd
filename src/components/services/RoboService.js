
import axios from  'axios'

const ROBO_API_JAVA_GET = "http://localhost:8080/engine/robo/ativos"
const ROBO_API_JAVA_POST = "http://localhost:8080/engine/robo"
const ROBO_API_JAVA_GET_BY_ID = "http://localhost:8080/engine/robo/buscarporid"
const ROBO_API_JAVA_GET_BY_NAME = "http://localhost:8080/engine/robo/buscarpornome"
const ROBO_API_JAVA_DELETE = "http://localhost:8080/engine/robo"

class RoboService {

    getRobos() {
        return axios.get(ROBO_API_JAVA_GET);
    }

    createRobo(robos){
            return axios.post(ROBO_API_JAVA_POST, robos)
    }

    getRoboById(id){
        return axios.get(ROBO_API_JAVA_GET_BY_ID + '/' + id)
    }
    
    getRoboByName(nome){
         return axios.get(ROBO_API_JAVA_GET_BY_NAME + '/' + nome)
    }

    editarRobo(robo){
        return axios.put(ROBO_API_JAVA_POST, robo);
    }

    deletarRobo(id){
        return axios.delete(ROBO_API_JAVA_DELETE + '/' + id)
    }
}

export default new RoboService()
