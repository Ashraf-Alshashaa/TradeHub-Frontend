import {FC} from "react"
import { Link } from "react-router-dom"


const Home:FC = () => {
    return(
        <div>
            <h1>Home page</h1>
            <Link to={"/test"}>Test page</Link>
        </div>
    )
}

export default Home