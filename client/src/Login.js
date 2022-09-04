import React from 'react'
import "./styles/Register.Login.css"


export default function Login(props) {
  const handleClick = () => {
    window.location.href = "/register"
  }
    return (
      <div className='Login'>
        <div className="Login-container" id="Login-container">
          <div className="Login-form-container sign-in-container">
            <form action="/api/login" method='post' className="Login-form">
              <h1>Sign in</h1>
              <input type="username"  placeholder="Username" name="username" />
              <input type="password" placeholder="Password" name="password" />
              {window.innerWidth < 474 ? <a href="/register">Dont have an account yet?</a> : <a href="/">Sign in later?</a>}
              <button className='Functional-button Login-button'>Sign In</button>
            </form>
          </div>
          <div className="Login-overlay-container">
            <div className="Login-overlay">
              <div className="Login-overlay-panel Login-overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost Login-button" id="signUp" onClick={handleClick}>Register</button>
              </div>
            </div>
          </div>
        </div>
</div>
    )
  }

