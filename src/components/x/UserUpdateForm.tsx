'use client'
import React from 'react';
import {useState} from 'react'
import { user } from "../../types/user";

interface props{
    user:user;
    updateSuccess:any;
}

// user:user
// user:props

export default function UserUpdateForm({user,updateSuccess}:props){

    const [updateData,setUpdateData] = useState({
        password: '',
        nickname: user.nickname
    });

    function dataChange(e:any){
        const { name, value } = e.target;
        setUpdateData({
            ...updateData,
            [name]: value
        })
    }

    async function handleSubmit(event:any){
        event.preventDefault();
        try{
            const response = await fetch('http://localhost:3000/user',{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: user.userEmail,
                    nickname: updateData.nickname,
                    password: updateData.password
                })
            });
            if(response.ok){
                console.log("회원수정 성공");
                updateSuccess();
            }else{
                throw new Error('Network response was not ok.');
            }
        }catch(error){
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
                <label htmlFor="userEmail">Email: </label>
                <input type="text" name="userEmail" value={user.userEmail} readOnly />
                <br/>
                <label htmlFor="password">비밀번호: </label>
                <input type="password" name="password" onChange={dataChange} required />
                <br/>
                <label htmlFor="nickname">사용자명: </label>
                <input type="text" name="nickname" defaultValue={user.nickname} onChange={dataChange} required />
                <br/>
                <button type='submit'>수정</button>
        </form>
    )
}