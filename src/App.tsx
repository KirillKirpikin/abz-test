import Footer from "./components/Footer"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Header/>
      <main className="flex-grow">
        <HomePage/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
