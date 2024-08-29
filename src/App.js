import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home";
import Navigation from "./routes/navigation/navigation";
import SignIn from "./routes/signIn/signIn";

const App = () => {
  const Shop = () => {
    return <div>I am the shop page</div>
  }

  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path="shop" element={<Shop/>}/>
        <Route path="signin" element={<SignIn/>}/>
      </Route>
    </Routes>
  )
}

export default App;
