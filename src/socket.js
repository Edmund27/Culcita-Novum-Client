import { apiUrl } from "./config/constants";
import io from 'socket.io-client';
const socket = io.connect(apiUrl)
export default socket;