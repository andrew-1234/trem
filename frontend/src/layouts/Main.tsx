import NavBar from "../components/NavBar"
import { Outlet } from "react-router-dom"
type Props = {}

const Main = (props: Props) => {
  return (
    <>
      <NavBar></NavBar>
      <Outlet />
    </>
  )
}

export default Main