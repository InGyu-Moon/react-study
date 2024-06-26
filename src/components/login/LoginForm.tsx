'use client'
import { set, useForm } from 'react-hook-form';
import useBearStore from '../../zustand/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function LoginForm() {

    const router = useRouter();
    const store:any = useBearStore();
    console.log('store',store);

    const {
        register,
        handleSubmit,
    } = useForm();

    async function onSubmit(data:any) {
        // alert(JSON.stringify(data));
        try{
            const response = await fetch('http://localhost:3000/user/jwt/login',{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: data.userEmail,
                    password: data.password
                }),
            });
            if(response.ok){
                const data = await response.json();
                console.log('data.token',data.token);
                
                store.setToken(data.token);
                console.log('1. store',store);

                alert('로그인 성공');
                router.push('/');
                // window.location.href = '/';
            }else{
                throw new Error('Network response was not ok.');
            }
        }
        catch(error){
            console.error('There was a problem with the fetch operation:', error);
        }
    }


    return(
        <div>
            <h2>로그인창</h2>
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

                <button style={{ marginLeft: '100px' }} type='submit' className='btn btn-outline-primary'>로그인</button>
                <Link href="/userInput" className='btn btn-outline-success'>회원가입</Link>
                {/* <button onClick={()=>{window.location.href = '/';}} style={{ marginLeft: '10px' }} type='button' className='btn btn-outline-success'>뒤로</button> */}
            </form>
            
                

            <br/>
        </div>
    )



}