
import AppContextProvider from "./contexts/AppContex";
import AppRouter from "./router/AppRouter";





function App() {

  return <AppContextProvider>
    <AppRouter></AppRouter>
  </AppContextProvider>
}

export default App
