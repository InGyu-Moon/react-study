import React from 'react';
import {user} from '../types/user'

interface Props {
    user: user;
}

export default function UserInfo({user}:Props){
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