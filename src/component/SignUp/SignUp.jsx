import { CgEnter } from "react-icons/cg";
import "./SignUp.css"

const SignUp = () => {
  return (
    <>


  <div className="sign">

    <form>

    <h1 style={{textAlign:"center"}}>SignUp Here</h1>

        <table cellPadding={"0px"} cellSpacing={"30px"}>
    <tr>
      <td>
      <label htmlFor="fname">First Name:</label>
      </td>
      <td>
      <input type="text" name="fname" id="fname" className="fname" placeholder="Enter your first name"/>
      </td>
    </tr>

    <tr>
      <td>
      <label htmlFor="lname">Last Name:</label>
      </td>
      <td>
      <input type="text" name="lname" id="fname" className="fname" placeholder="Enter your last name"/>
      </td>
    </tr>

    <tr>
      <td>
      <label htmlFor="email">Email:</label>
      </td>
      <td>
      <input type="email" name="email" id="email" className="email" placeholder="Enter your email"/>
      </td>
    </tr>
        </table>

        <button id="submit">Sign Up</button>

    </form>
  </div>

    </>
  )
}

export default SignUp;



{/* <div>
<label htmlFor="fname">First Name:</label>
<input type="text" name="fname" id="fname" className="fname" placeholder="Enter your first name"/>
</div>
<div>
<label htmlFor="lname">Last Name:</label>
<input type="text" name="lname" id="fname" className="fname" placeholder="Enter your last name"/>
</div>
<div>
<label htmlFor="email">Email:</label>
<input type="email" name="email" id="email" className="email" placeholder="Enter your email"/>
</div>
<div>
<input type="submit" name="submit" id="submit" className="submit"/>
</div> */}