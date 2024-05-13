'use client'
import React from 'react';
import {useState,useEffect} from 'react'
import {user} from '../types/user'
import UserUpdateForm from './UserUpdateForm';

// 수정, 삭제
export default function UserInput(){

    const [updateFlags,setUpdateFlags] = useState<boolean[]>([]);

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
                getAllUsers();
                /**
                 * 다시 랜더링 할때
                 */
            }else{
                throw new Error('Network response was not ok.');
            }
        }catch(error){
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    function toggleUpdateFlag(index: number) {
        const newFlags = [...updateFlags];
        newFlags[index] = !newFlags[index];
        setUpdateFlags(newFlags);
        getAllUsers();
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
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {allUsers.map((user,index) => (
                    <div key={user._id} style={{ flex: '0 0 calc(25% - 20px)', marginBottom: '20px', marginRight: '20px' }}>
                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                            { updateFlags[index] ? 
                            <div>
                                <UserUpdateForm user={{userEmail:user.userEmail,nickname:user.nickname}} updateSuccess={()=>toggleUpdateFlag(index)}/>
                            </div> :
                            <>
                            <div>
                                <p><b>Email:</b> {user.userEmail}<br /></p>
                                <p><b>NickName:</b> {user.nickname}<br /></p>
                                <p><b>JoinDate:</b> {user.joinDate}<br /></p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                                <button onClick={() => toggleUpdateFlag(index)}>수정</button>
                                <button onClick={()=>deleteUser(user.userEmail) }style={{ marginLeft: '30px' }}>삭제</button>
                            </div>
                            </>
                            }
                            
                            
                    </div>
                    <hr/>
                    </div>
                ))}
            </div>
        </div>
    );
}
// onClick={()=>updateUser(user.userEmail,user.nickname) }