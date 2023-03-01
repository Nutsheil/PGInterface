import axios from "axios";

const $host = axios.create({
    baseURL: 'http://127.0.0.1:8000'
    // baseURL: 'http://10.248.76.11:8000'
})

export {
    $host
}