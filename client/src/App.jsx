import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Thumbnail from "./components/pages/Thumbnail"
import { createBrowserRouter, RouterProvider } from "react-router-dom"


function App() {

  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<Thumbnail/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/login",
      element:<Login/>
    }
  ]) 

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
