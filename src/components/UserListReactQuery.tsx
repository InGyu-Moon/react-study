'use client'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import useBearStore from '../zustand/store';
import Link from 'next/link';


export default function UserListReactQuery() {


    const store:any = useBearStore();
    console.log(store);
    console.log("=== user list ===");
    console.log("token: ",store.token);

    const { isLoading, isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/user',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': store.token,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // bearStore.updateBears(data.data.length);
            const userList = await response.json();
            store.updateBears(userList.data.length);
            return userList;
        },
        
    });  

      if (isLoading || isPending) {
        console.log('☆☆☆Loading...☆☆☆')
        return <div><h1>☆☆☆Loading...☆☆☆</h1></div>
      }

      if (error){
        console.log('error')
        return 'An error has occurred: ' + error.message
      }


      return(
        <div>

        <h3 style={{ marginRight: '50px' }}>전체 사용자 정보</h3> <span>{store.bears} &nbsp;&nbsp;&nbsp;</span>

            <div style={{display: 'flex',alignItems: 'center'}}>
                {/* <Link href="/login" style={{marginLeft:'20px'}} className='btn btn-outline-success'>로그인</Link> */}
                {store.token === '' ? (
                    <Link href="/login" style={{marginLeft:'20px'}} className='btn btn-outline-success'>로그인</Link>
                ) : (
                    <button style={{marginLeft:'20px'}} className='btn btn-outline-success' onClick={store.removeToken} >로그아웃</button>
                    // <Link href="/logout" style={{marginLeft:'20px'}} className='btn btn-outline-success'>로그아웃</Link>
                )}
            </div>
            
            <hr></hr>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {data.data.map((user,index) => (
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
      )

}