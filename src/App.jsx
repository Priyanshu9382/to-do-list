import Form from "./components/Form";
import Navbar from "./components/Navbar";


export default function App() {
  return (
    <>
    <div className="maincontainer rounded-lg">
      <div className="navbar-container">
        <Navbar/>
      </div>
      <div className="flex justify-center content-container bg-purple-50 min-h-screen ">
        <div className="mainContent bg-violet-200 min-h-full md:w-3/5 md:min-w-[700px] rounded-xl m-3">
          <Form/>
        </div>
      </div>
    </div>
    
    </>
  )
}