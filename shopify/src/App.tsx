import './App.css'
import "./header/header"
import Header from './header/header'
import Cover from './cover/cover'
import Grid from './Grid/grid'

function App() {
  return (
    <div>
      <Header/>
      <Cover/>
      <div className='seperation-section'>
        SUSTAINABLE, ETHICALLY MADE CLOTHES IN SIZES XXS TO 6XL
      </div>
      <Grid/>
    </div>
  )
}

export default App
