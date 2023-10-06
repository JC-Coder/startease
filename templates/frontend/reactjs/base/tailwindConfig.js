export const TailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  
  `

export const PostCssConfig = `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

`

export const TailwindIndexCSSFile = `
@tailwind base;
@tailwind components;
@tailwind utilities;`

export const AppTailwindTemplate = `
import { useState } from "react"
import reactLogo from "./assets/react.svg"
import StartEaseLogo from "/startease.svg"

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="max-w-[1280px] mx-auto my-0 p-8 text-center">
      <div>
        <a href="https://github.com/JC-Coder/startease" target="_blank">
          <img src={StartEaseLogo} className="h-24 p-6 [will-change:filter] [transition:filter] duration-300" alt="StartEase logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-24 p-6 [will-change:filter] [transition:filter] duration-300  react" alt="React logo" />
        </a>
      </div>
      <h1>StartEase + React + TailwindCSS</h1>
      <div className="p-8">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-[#888]">
        Click on the StartEase and React logos to learn more
      </p>
    </main>
  )
}

export default App

`
