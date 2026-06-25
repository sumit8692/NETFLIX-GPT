// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import './App.css'
import { Provider } from 'react-redux'
import Body from './components/Body'
import appStore from './utils/appStore'

function App() {
  return (
    <Provider store={appStore}>
      <Body/>
    </Provider>
  )
}

export default App