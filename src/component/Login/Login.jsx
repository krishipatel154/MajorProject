import "./Login.css"


const Login = () => {
  return (
    <>
          <div className="logins">
            <form action="">
                  <h1>Login Here</h1>
                  <div className="login-form">
                  <label htmlFor="Email">Email:</label>
                  <input type="email" name="email" id="email" placeholder="Enter Email" />
                  
                  </div>
                  <button id="send">SEND OTP</button>
                              
            </form>
          </div>
    </>
  )
}

export default Login;