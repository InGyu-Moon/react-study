import React from "react";

import {user} from '../types/user';
const userArr = [
    {userEmail:"test1@naver.com",nickname:"nickname1",joinDate:"2024-04-16"},
    {userEmail:"test2@gmail.com",nickname:"nick2",joinDate:"2024-04-15"},
    {userEmail:"test3@google.com",nickname:"name3",joinDate:"2024-04-14"}
];
interface props{
    // userEmail:string;
    // nickname:string;
    // joinDate:string;
    user:user;
}
function User({ user }:props) {
    return (
      <div>
        <b>{user.userEmail}</b> <span>({user.nickname})</span><span>({user.joinDate})</span>
      </div>
    );
  }

export default function Users(){

    return(
        <div>
            <form>
                <input type="text"></input>
            </form>
            {userArr.map(user =>(
                <User user={user} />
            ))}
        </div>
    )
}