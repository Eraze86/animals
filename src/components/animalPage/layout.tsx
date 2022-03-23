import { Link, Outlet } from "react-router-dom";

export function Layout(){
    return(
    <>
    <nav>
        <Link to="/">Animals</Link>
  
        
    </nav>
    <Outlet></Outlet>
    </>)
}