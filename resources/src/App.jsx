import {useState} from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                    <h1 className="text-6xl  font-bold text-gray-800 mb-4 text-center">
                        Tailwind CSS is Working! 🎉
                    </h1>
                    <div className="text-center">
                        <button 
                            onClick={() => setCount(count + 1)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                        >
                            Count: {count}
                        </button>
                    </div>
                    <p className="text text-sm mt-4 text-center">
                        Click the button to test React state management
                    </p>
                </div>
            </div>
        </>
    )
}

export default App
