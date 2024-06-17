'use client'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import useBearStore from '../zustand/store';
import Link from 'next/link';


export default function UserListReactQuery() {

    const bearStore:any = useBearStore();

    const { isLoading, isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/user');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("@@@",data);

            // bearStore.updateBears(data.data.length);
            return response.json();
        },
        
    });  

      if (isLoading || isPending) {
        console.log('loading')
        return <div>☆☆☆Loading...☆☆☆</div>
      }

      if(data){
        // bearStore.updateBears(data.data.length);
        console.log(data.data.length);
      }

      if (error){
        console.log('error')
        return 'An error has occurred: ' + error.message
      }


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
      )

}