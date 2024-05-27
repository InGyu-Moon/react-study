'use client'
import { useNavigate } from 'react-router-dom'; //useHistory 대신
import React from 'react';
import {useState} from 'react'
import useBearStore from '../zustand/store';
import { useForm } from 'react-hook-form';

export default function UserInput(){

    const bearStore:any = useBearStore();
    
    const navigate = useNavigate();

    // const [userInputData, setUserData] = useState({
    //     userEmail: '',
    //     password: '',
    //     nickname: ''
    // });

    // function dataChange(e:any){
    //     const { name, value } = e.target;
    //     setUserData({
    //         ...userInputData,
    //         [name]: value
    //     })
    // }
    //
    // async function handleSubmit(event:any){
    //     event.preventDefault();
    //     try{
    //         const response = await fetch('http://localhost:3000/user',{
    //             method:"POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 userEmail: userInputData.userEmail,
    //                 password: userInputData.password,
    //                 nickname: userInputData.nickname,
    //             }),
    //         });
    //         if(response.ok){
    //             console.log("회원추가 성공");
    //             bearStore.increaseTotalMember();
    //             console.log('bearStore.bears',bearStore.bears)
    //             navigate('/');
    //             // window.location.href = '/';

    //         }else{
    //             throw new Error('Network response was not ok.');
    //         }
    //     }catch(error){
    //         console.error('There was a problem with the fetch operation:', error);
    //     }
    // }

    const {
        register,
        handleSubmit,
    } = useForm();

    async function onSubmit(data:any) {
        try{
            const response = await fetch('http://localhost:3000/user',{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify({
                        userEmail: data.userEmail,
                        password: data.password,
                        nickname: data.nickname,
                    }),
                });
                if(response.ok){
                    console.log("회원추가 성공");
                    bearStore.increaseTotalMember();
                    console.log('bearStore.bears',bearStore.bears)
                    navigate('/');
                // window.location.href = '/';

            }else{
                throw new Error('Network response was not ok.');
            }
            }catch(error){
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    
    return(
        <div>
            <h3>사용자 추가</h3>
            <hr/>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label  htmlFor="userEmail" style={{ marginLeft: '10px' , marginRight: '20px'}}>Email :</label>
                    <input type="text" id="userEmail" className='form-control' style={{width:'300px'}}
                    {...register('userEmail', { required: true })} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label  htmlFor="password" style={{marginRight: '10px'}}>비밀번호 :</label>
                    <input type="password" id="password" className='form-control' style={{width:'300px'}}
                    {...register('password', { required: true })} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label  htmlFor="nickname" style={{marginRight: '10px'}}>사용자명 :</label>
                    <input type="text" id="nickname" className='form-control' style={{width:'300px'}}
                    {...register('nickname', { required: true })} />
                </div>

                <button style={{ marginLeft: '100px' }} type='submit' className='btn btn-outline-primary'>추가</button>
                <button onClick={()=>{navigate(-1);}} style={{ marginLeft: '10px' }} type='button' className='btn btn-outline-success'>뒤로</button>
            </form>





            {/* <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="userEmail" style={{ marginLeft: '10px' , marginRight: '20px'}}>Email: </label>
                    <input type="text" className='form-control' style={{ width: '300px' }} name="userEmail" onChange={dataChange} required />
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
                    name="nickname" onChange={dataChange} required />
                </div>
                <br/>
                <button style={{ marginLeft: '100px' }} type='submit' className='btn btn-outline-primary'>추가</button>
                <button onClick={()=>{navigate(-1);}} style={{ marginLeft: '10px' }} type='button' className='btn btn-outline-success'>뒤로</button>
            </form> */}
        </div>
    );
}
// onClick={()=>updateUser(user.userEmail,user.nickname) }