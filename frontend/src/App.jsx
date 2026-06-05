import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Signup } from "./pages/Signin"
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"

function App (){
  return (
    <>

    <BrowserRouter>
      <Routes>

        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Router path ="/send" element={<SendMoney/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}