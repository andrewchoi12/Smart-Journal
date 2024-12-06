import Form from "../components/Form"
import "../styles/Login.css"

function Login() {
    return <div class="container">
                <div class="main">
                    <div class="header">Smart Journal</div>
                    <Form class="login-form" route="/api/token/" method="login" />  
                    <p class="use-note">For testing use =&gt; User: a Password: a</p>
                </div>
                <div class="footer">
                    <p>Created by Andrew Choi</p>
                </div>
            </div>
}

export default Login