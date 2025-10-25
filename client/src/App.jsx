import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Dashboard from "./components/pages/Dashboard"
import Thumbnail from "./components/pages/Thumbnail"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ProtectedRoutes from "./components/protected/ProtectedRoutes"
import TaskBoard from "./components/pages/TaskBoard"


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
    },
    {
      path:"/dashboard",
      element:(
        <ProtectedRoutes>
          <Dashboard/>
        </ProtectedRoutes>
      )
    },
    {
      path:"/task-create",
      element:(
        <ProtectedRoutes>
          <TaskBoard/>
        </ProtectedRoutes>
      )
    }
  ]) 

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
