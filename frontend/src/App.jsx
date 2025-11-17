import Accueil from './assets/page/Accueil.jsx'

function App() {

  return (
    <>
      <header className="w-full bg-white/80 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight">Ecommerce</h1>
          <p className="text-neutral-600">Bienvenue sur notre boutique</p>
        </div>
      </header>
      <Accueil />
    </>
  )
}

export default App
