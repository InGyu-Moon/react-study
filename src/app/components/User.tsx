import React from 'react';
import {useState, useEffect} from 'react';
import {user} from '../types/user'

interface Props {
    user: user;
}
//화면이 뜨면 api호출
//상태에 저장
//상태값 화면에 출력
export default function UserInfo(){
    const [user,setUser] = useState();
    useEffect(()=>{
        async function getUser(){
            
        }

    })
    return (
        <div>
            <p>ID: {user.id}</p>
            <p>User Email: {user.userEmail}</p>
            <p>Password: {user.password}</p>
            <p>Nickname: {user.nickname}</p>
            <p>Join Date: {user.joinDate}</p>
        </div>
    );
}

// const UserInfo: React.FC<Props> = ({ user }) => {
//     return (
//         <div>
//             <p>ID: {user.id}</p>
//             <p>User Email: {user.userEmail}</p>
//             <p>Password: {user.password}</p>
//             <p>Nickname: {user.nickname}</p>
//             <p>Join Date: {user.joinDate}</p>
//         </div>
//     );
// }