import './App.css'
import Navbar from '../Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Components/Home';
import MyNetwork from '../Components/MyNetwork';
import Jobs from '../Components/Jobs';
import Messaging from '../Components/Messaging';
import Notification from '../Components/Notification';
import Profile from '../Components/Profile';
import Post from '../Components/Post';

function App() {

  return (
    <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/MyNetwork" element={<MyNetwork />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/messaging" element={<Messaging />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
    </>
  )
}

export default App
