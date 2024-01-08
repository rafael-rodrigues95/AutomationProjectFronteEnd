
import axios from  'axios'

// const ENDPOINT = "http://localhost:8080"
const ENDPOINT = "http://192.168.0.180:8088"

const ROBO_API_JAVA_GET = ENDPOINT + "/engine/robo/all"
const ROBO_API_JAVA_POST = ENDPOINT + "/engine/robo"
const ROBO_API_JAVA_GET_BY_ID = ENDPOINT + "/engine/robo/buscarporid"
const ROBO_API_JAVA_GET_BY_NAME = ENDPOINT + "/engine/robo/buscarpornome"
const ROBO_API_JAVA_DELETE = ENDPOINT + "/engine/robo"

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
