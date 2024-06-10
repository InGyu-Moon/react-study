'use client'
import React from 'react';
import {useState} from 'react'
import { user } from "../types/user";
// import { useRouter } from 'next/router';

interface props{
    user:user;
    updateSuccess:any;
}
interface userProps{
    userEmail:string;
    nickname:string;
}

export default function UserUpdate(userEmail:any, nickname:any){ //{user}:props

    // const navigate = useNavigate();
    // const location = useLocation();

    // const { userEmail, nickname } = user;
    // const userEmail = user.userEmail;
    // const nickname = user.nickname;

    // const router = useRouter();
    // const { userEmail, nickname } = router.query;

    console.log(userEmail, nickname);

    const [updateData,setUpdateData] = useState({
        password: '',
        nickname: nickname
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
                    userEmail: userEmail,
                    nickname: updateData.nickname,
                    password: updateData.password
                })
            });
            if(response.ok){
                console.log("회원수정 성공");
                // navigate('/');
                window.location.href = '/';
            }else{
                throw new Error('Network response was not ok.');
            }
        }catch(error){
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    return(
        <div>
            <h3>사용자 수정</h3>
            <hr/>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="userEmail" style={{ marginLeft: '10px' , marginRight: '20px'}}>Email: </label>
                    <input type="text" className='form-control' style={{ width: '300px' }} 
                    value={userEmail} name="userEmail" onChange={dataChange} readOnly />
                </div>
                <br/>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="password" style={{ marginRight: '10px' }}>비밀번호: </label>
                    <input type="password" className='form-control' style={{width:'300px'}}
                    name="password" onChange={dataChange} required />
                </div>
                <br/>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="nickname" style={{ marginRight: '10px' }}>사용자명: </label>
                    <input type="text" className='form-control' style={{width:'300px'}}
                    defaultValue={nickname} name="nickname" onChange={dataChange} required />
                </div>
                <br/>
                <button style={{ marginLeft: '100px' }} type='submit' className='btn btn-outline-primary'>수정</button>
                <button onClick={()=>{window.location.href = '/';}} style={{ marginLeft: '10px' }} type='button' className='btn btn-outline-success'>뒤로</button>
        
            </form>
        </div>
        
    )
}