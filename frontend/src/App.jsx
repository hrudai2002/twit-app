import './App.css'
import { LeftBar } from './components/LeftBar/left-bar';
import { MiddleBar } from './components/MiddleBar/middle-bar'; 
import { RightBar } from './components/RightBar/right-bar';


function App() {
  return (
    <div className='main'>
      <div className='left'>
         <LeftBar />
      </div>
      <div className='middle'>
        <MiddleBar />
      </div>
      <div className='right'>
        <RightBar />
      </div>
    </div>
  )
}

export default App;
