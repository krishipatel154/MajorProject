import { FaHouseChimneyUser } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { GrCertificate } from "react-icons/gr";
import "./Navbar.css" 

const Navbar =()=>{
    return(
        <>
        <nav>
            <div className="navbar">
                <div className="logo">
                    <Link to="/"><img src="../src/images/logo.png" alt="" /></Link>
                </div>
                <div className="users">
                    <ul>
                    <li style={{border:"1px solid white"}}><GrCertificate /> Get Certified</li>
                    <li><Link to="/login" style={{color:"#BBBBBB",TextDecoretion:"none"}}>Login</Link></li>
                    <li><Link to="/signup" style={{color:"#BBBBBB"}}>SignUp</Link></li>
                        <li><FaHouseChimneyUser /></li>
                        
                    </ul>
                </div>
            </div>

            <div className="menubar">
                <ul className="languages">
                    <li><Link to="/language/:html">HTML</Link></li>
                
                <li className="lang"><Link to="/language/:css">CSS</Link></li>
                <li className="lang"><Link to="/language/:javascript">JAVASCRIPT</Link></li>
                <li className="lang"><Link to="/language/:sql">SQL</Link></li>
                <li className="lang"><Link to="/language/:java">JAVA</Link></li>
                <li className="lang"><Link to="/language/:c">C</Link></li>
                    {/* <li className="lang">C++</li>
                    <li className="lang">C#</li>
                    <li className="lang">BOOTSTRAP</li>
                    <li className="lang">REACT</li>
                    <li className="lang">NODE</li>
                    <li className="lang">MYSQL</li> */}
                </ul>
            </div>
            </nav>

            
        </>
    );
}

export default Navbar;