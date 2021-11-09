import React from 'react';
import Login from './pages/Login';


function App() {

  const postLoginData = (data:{}) => {
    console.log(data);
  }

  return (
    <div>
      <Login submitData={postLoginData}/>
    </div>
  );
}

export default App;
