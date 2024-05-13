'use client'
import React from 'react';
import {useState,useEffect} from 'react'
import {user} from '../types/user'

// 수정, 삭제
export default function UserInput(){

    const [userInputData, setUserData] = useState({
        userEmail: '',
        password: '',
        nickname: ''
    });
    const [allUsers, setAllUsers] = useState<user[]>([]);
    useEffect(() => {
        getAllUsers();
    }, []);

    async function getAllUsers(){
        try{
            const response = await fetch("http://localhost:3000/user");
            if(response.ok){
                const data = await response.json();
                setAllUsers(data.data);
            }else{
                throw new Error('Network response was not ok.');
            }
        }catch(error){
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    function dataChange(e:any){
        const { name, value } = e.target;
        setUserData({
            ...userInputData,
            [name]: value
        })
    }

    async function handleSubmit(event:any){
        event.preventDefault();
        try{
            const response = await fetch('http://localhost:3000/user',{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: userInputData.userEmail,
                    password: userInputData.password,
                    nickname: userInputData.nickname,
                }),
            });
            if(response.ok){
                console.log("회원추가 성공");
                getAllUsers();
            }else{
                throw new Error('Network response was not ok.');
            }
        }catch(error){
            console.error('There was a problem with the fetch operation:', error);
        }
    }


    return(
        <div>
            <h3>user 추가</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userEmail">Email: </label>
                <input type="text" name="userEmail" onChange={dataChange} required />
                <br/>
                <label htmlFor="password">비밀번호: </label>
                <input type="password" name="password" onChange={dataChange} required />
                <br/>
                <label htmlFor="nickname">사용자명: </label>
                <input type="text" name="nickname" onChange={dataChange} required />
                <br/>
                <button type='submit'>회원추가</button>
            </form>


            <h3>모든 사용자 정보</h3>
            <hr></hr>
            {allUsers.map(user => (
                    <div key={user._id}>
                            Email: {user.userEmail}<br></br>
                            NickName: {user.nickname}<br></br>
                            JoinDate: {user.joinDate}<br></br>
                            <hr></hr>
                    </div>
                ))}

        </div>
    );
}