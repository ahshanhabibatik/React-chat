import axios from "axios"
const axiosPublic = axios.create({
  baseURL: 'https://chat-server-ahshanhabibatik-ahshan-habib-s-projects.vercel.app',
  // withCredentials : true,
})
function UseAxiosPublic() {
  return (
    axiosPublic
  )
}


export default UseAxiosPublic;