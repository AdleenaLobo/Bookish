
import { useState , useEffect} from "react"
function App(){
  const [message , setMessage] = useState("")

  useEffect(()=>{
    fetch("/api/hello")
    .then(res => res.json())
    .then(data => setMessage(data.message))
  },[])
  return(
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Bookish</h1>
      <p className="text-gray-500 mb-4">{message}</p>
      <button>Get Started</button>
    </div>)
}

export default App