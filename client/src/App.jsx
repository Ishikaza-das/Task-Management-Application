import Thumbnail from "./components/pages/Thumbnail"
import { createBrowserRouter, RouterProvider } from "react-router"

function App() {

  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<Thumbnail/>
    }
  ]) 

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
