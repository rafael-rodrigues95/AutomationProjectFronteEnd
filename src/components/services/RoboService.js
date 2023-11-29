
import axios from  'axios'

const ROBO_API_BASE_URL = "http://localhost:8080/engine/ativos"

class RoboService {

    getRobos() {
        return axios.get(ROBO_API_BASE_URL);
    }

    createRobo(robos){
        return axios.post(ROBO_API_BASE_URL, robos)
    }
}

export default new RoboService()
