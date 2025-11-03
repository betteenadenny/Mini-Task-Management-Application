import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./components/Sigup";
import Tasks from "./components/Tasks";

const router = createBrowserRouter([
    {path:'/',element:<App/>},
    {path:'/register',element:<Register/>},
    {path:'/tasks',element:<Tasks/>}
])



export default router;