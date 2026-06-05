import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signup = () => {
    return (
        <div>
            <div>
                <div>
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"Enter your credentials"}/>
                    <InputBox placeholder="rk301855@gmail.com" label={"Email"} />
                    <InputBox placeholder="password" label={"password"}/>
                    <div><Button label={"Sign Up"} /></div>
                    <BottomWarning label={"Don't have a account? "}  buttonText={"Sign in"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
} 