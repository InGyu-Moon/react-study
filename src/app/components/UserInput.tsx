'use client'
import React from 'react';
import {useState} from 'react'


export default function UserInput(){

    const [userInputData, setUserData] = useState({
        email: '',
        password: '',
        nickname: ''
    });

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
                    userEmail: userInputData.email,
                    password: userInputData.password,
                    nickname: userInputData.nickname,
                }),
            });
            if(response.ok){
                console.log("회원추가 성공");
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
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" onChange={dataChange} required />
                <br/>
                <label htmlFor="password">비밀번호: </label>
                <input type="password" name="password" onChange={dataChange} required />
                <br/>
                <label htmlFor="nickname">사용자명: </label>
                <input type="text" name="nickname" onChange={dataChange} required />
                <br/>
                <button type='submit'>회원추가</button>
            </form>
        </div>
    );
}