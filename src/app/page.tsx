'use client'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserInput from "./components/UserInput";
import UserUpdate from "./components/UserUpdate";

export default function Home() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/userInput" element={<UserInput />} />
          <Route path="/userUpdate" element={<UserUpdate />} />
        </Routes>
      </Router>
    </div>
  );
}
