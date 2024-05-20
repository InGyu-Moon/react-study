'use client'
import React from 'react';
import {useState, useEffect} from 'react';
import {user} from '../../types/user'

//화면이 뜨면 api호출
//상태에 저장
//상태값 화면에 출력
export default function UserInfo(){
    const [user,setUser] = useState<user>();
    useEffect(()=>{
            async function getUser(){
                try{
                    const response = await fetch("http://localhost:3000/user/newMember@naver.com");
                    if(response.ok){
                        const data = await response.json();
                        // 오류 발생 -> setUser(data);
                        setUser(data.data);
                        console.log('data.data',data.data);
                    }else {
                        throw new Error('Network response was not ok.');
                    }
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            }

        getUser();
        console.log('1. user >>> ',user);
        setTimeout(()=>{
            console.log('[setTimeout] ',user);
        },1000)

        return ()=>{
            console.log('[return]',user);
        }
    },[])

    // useEffect(() => {
    //     console.log('user >>> ', user);
    // }, [user]);

    return (
        <div>
            <p>Email: {user && user.userEmail}</p>
            <p>nickname: {user && user.nickname}</p>
            <p>joinDate: {user && user.joinDate}</p>
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