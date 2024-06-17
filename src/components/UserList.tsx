'use client'
import React, { Suspense } from 'react';
import {useState,useEffect} from 'react'
import {user} from '../types/user'
import useBearStore from '../zustand/store';
import Link from 'next/link';



export default function UserInput(){

    getAllUsers();

    // useEffect(() => {
    //     getAllUsers();
    // },[])

    const bearStore:any = useBearStore();

    const handleIncrease = () => {
        bearStore.increaseTotalMember();
      };
    
      const handleDecrease = () => {
        bearStore.decreaseTotalMember();
      };


    const [allUsers, setAllUsers] = useState<user[]>([]);

    



    // let totalMember = bearStore.bears;
    // useEffect(() => {
    //     totalMember = bearStore.bears;
    // },[bearStore.bears])


    async function getAllUsers(){
        try{
            const response = await fetch("http://localhost:3000/user");
            if(response.ok){
                const data = await response.json();
                setAllUsers(data.data);
                bearStore.updateBears(data.data.length);
            }else{
                throw new Error('Network response was not ok.');
            }
        }catch(error){
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    async function deleteUser(userEmail:string){
        console.log(userEmail);
        try{
            const response = await fetch('http://localhost:3000/user',{
                method:"DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: userEmail
                })
            });
            if(response.ok){
                console.log("회원삭제 성공");
                await bearStore.decreaseTotalMember();
                console.log('bearStore.bears',bearStore.bears)
                getAllUsers();
            }else{
                throw new Error('Network response was not ok.');
            }
        }catch(error){
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    // if (allUsers.length === 0) {
    //     return <h2>🌀 Loading...</h2>;
    // }
    
    return(
        <div>
            <div style={{display: 'flex',alignItems: 'center'}}>
                <h3 style={{ marginRight: '50px' }}>전체 사용자 정보</h3> <span>{bearStore.bears} &nbsp;&nbsp;&nbsp;</span>
                <Link href="/userInput" className='btn btn-outline-primary'>사용자 추가</Link>
            </div>
            {/* <div>
            <button className="btn btn-outline-info" style={{marginRight:'20px'}} onClick={handleIncrease}>Increase</button>
            <button className="btn btn-outline-info" onClick={handleDecrease}>Decrease</button>
            </div> */}
            
            <hr></hr>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {allUsers.map((user,index) => (
                        <div key={user._id} style={{ flex: '0 0 calc(25% - 20px)', marginBottom: '20px', marginRight: '20px' }}>
                            <div style={{ display: 'flex', marginBottom: '10px' }}>
                                <div>
                                    <p><b>Email:</b> {user.userEmail}<br /></p>
                                    <p><b>NickName:</b> {user.nickname}<br /></p>
                                    <p><b>JoinDate:</b> {user.joinDate}<br /></p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                                    <Link href={
                                        { pathname: "/userUpdate",
                                            query: {
                                                userEmail: user.userEmail, nickname: user.nickname,
                                            },
                                        }}
                                        className='btn btn-outline-info' key={user._id}>수정</Link>     
                                    {/* <button className='btn btn-outline-danger' onClick={()=>deleteUser(user.userEmail) }style={{ marginLeft: '30px' }}>삭제</button> */}
                                    <Link href={
                                        { pathname: `/userDelete/${user.userEmail}`,
                                        }} className='btn btn-outline-danger' key={user._id}>삭제</Link>
                                </div> 
                            </div>
                        <hr/>
                        </div>
                    ))}
                </div>
            
        </div>
    );
}