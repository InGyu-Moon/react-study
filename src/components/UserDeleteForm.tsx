'use client'
// import {} from "next/navigation"
import { useForm } from 'react-hook-form';
interface props{
    userEmail:string
}

export default function UserDeleteForm(userEmail:props){
    const email = decodeURIComponent(userEmail.userEmail);

    const {
        register,
        handleSubmit,
    } = useForm();

    async function onSubmit(data:any) {
        const check = await checkPassword(data);
        if(check){
            deleteUser(data.userEmail);
        }
        else{
            throw new Error('비밀번호가 일치하지 않습니다.');
        }
    }
    async function checkPassword(input:any){
        try{
            const response = await fetch (`http://localhost:3000/user/check/${input.userEmail}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password: input.password,
                    }),
                }
            );
            if(response.ok){
                const result = await response.json();
                if(result.check){
                    return true;
                }
                else{
                    return false;
                }
            }else{
                throw new Error('Network response was not ok.');
            }
        }catch(error){
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    async function deleteUser(userEmail:string){
        try{
            const response = await fetch('http://localhost:3000/user',{
                method:"DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify({
                        userEmail: userEmail,
                    }),
            });
            if(response.ok){
                    console.log(userEmail,"회원삭제 성공");
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
            <h1>회원삭제</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                Email: <input type='text' value={email} readOnly
                {...register('userEmail', { required: true })}/><br/>
                PassWord: <input type='password' 
                {...register('password', { required: true })}/> <br/>
                <button style={{ marginLeft: '100px' }} type='submit' className='btn btn-outline-primary'>삭제</button>
                <button onClick={()=>{window.location.href = '/';}} style={{ marginLeft: '10px' }} type='button' className='btn btn-outline-success'>뒤로</button>
            </form>
        </div>
    )
}