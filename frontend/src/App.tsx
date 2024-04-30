import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import AppContextProvider from "./contexts/AppContex";
import Register, { regAction } from "./pages/RegisterPage";
import Login from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { index: true, element: <h1>Start</h1> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register />, action: regAction },
    ]
  }
])

function App() {
  return <AppContextProvider>
    <RouterProvider router={router}>
    </RouterProvider>
  </AppContextProvider>
}

export default App
