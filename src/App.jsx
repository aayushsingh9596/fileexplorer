import Folder from './Folder.jsx';
import './App.css';
import folderData from './data/folderData.json';
import { useState } from 'react';
// 

function App() {
  const [data,setData]=useState(folderData);

  return (
    <div className='app'>
      <Folder key={data.name+data.type} data={data} setData={setData}/>
    </div>
  )
}

export default App
