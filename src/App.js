import './App.css';
import React, { useRef } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import { BrowserRouter , Routes , Route } from 'react-router-dom';

const App = () => {
  const apikey = process.env.REACT_APP_API_KEY
  const ref = useRef();
    return (
      <div>
        <BrowserRouter>
        <NavBar/>
        <LoadingBar color='#f11946' ref={ref} />
        <Routes>
          <Route path='/' element={<News refrance={ref} apikey={apikey} key='general' category='general'/>} />
          <Route path='/business' element={<News refrance={ref} apikey={apikey} key='business' category='business'/>} />
          <Route path='/entertainment' element={<News refrance={ref} apikey={apikey} key='entertainment' category='entertainment'/>} />
          <Route path='/health' element={<News refrance={ref} apikey={apikey} key='health' category='health'/>} />
          <Route path='/science' element={<News refrance={ref} apikey={apikey} key='science' category='science'/>} />
          <Route path='/sports' element={<News refrance={ref} apikey={apikey} key='sports' category='sports'/>} />
          <Route path='/technology' element={<News refrance={ref} apikey={apikey} key='technology' category='technology'/>} />
        </Routes> 
        </BrowserRouter> 
      </div>
    )
}
export default App