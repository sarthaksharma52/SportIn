import './App.css'
import Navbar from '../Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Components/Home';
import News from '../Components/News';
import Messaging from '../Components/Messaging';
import Notification from '../Components/Notification';
import Profile from '../Components/Profile';
import Post from '../Components/CreatePost';
import SignUp from '../Components/SignUp';
import SignIn from '../Components/SignIn';
import Jobs from '../Components/Jobs'
import { useState } from 'react';

function App() {


  //  just for check data is travel through props or not in app.jsx from signup.jsx
  const [shareData,setShareData] = useState("");
  console.log(shareData);

  return (
    <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/post" element={<Post />} />
                <Route path="/news" element={<News />} />
                <Route path="/messaging" element={<Messaging />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signup" element={<SignUp Data={setShareData}/>} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
    </>
  )
}

export default App
