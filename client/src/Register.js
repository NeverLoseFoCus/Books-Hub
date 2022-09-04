import React from 'react'
import "./styles/Register.Login.css"

export default function Register(props) {
  const handleClick = () => {
    window.location.href = "/login"
  }
    return (
      <div className='Login'>
        <div className="Login-container" id="Login-container">
          <div className="Login-form-container sign-in-container">
            <form action="/api/register" method='post' className="Login-form" onSubmit={() => props.handleOpenEvent("succesfuly registerd you")}>
              <h1>Register</h1>
              <input type="username" placeholder="Username" name="username" />
              <input type="email" placeholder="Email" name='email' />
              <input type="password" placeholder="Password" name='password' />
              {window.innerWidth < 474 ? <a href="/login">Already have an account?</a> : <a href="/">register in later?</a>}
              <button className='Login-button'>Register</button>
            </form>
          </div>
          <div className="Login-overlay-container">
            <div className="Login-overlay">
              
              <div className="Login-overlay-panel Login-overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost Login-button" id="signUp" onClick={handleClick}>Sign in</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
}