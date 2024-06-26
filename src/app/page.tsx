'use client'
import { Suspense } from "react";
import UserList from "../components/UserList";
import Loading from "./loading";
import useBearStore from '../zustand/store';

import UserListReactQuery from "@/components/UserListReactQuery";

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import LoginForm from "@/components/login/LoginForm";



export default function Home() {

  const store:any= useBearStore();
  const queryClient = new QueryClient()

  function checkToken(){
    if(store.token === ''){
      return false;
    }
    else{
      return true;
    }
  }


  return (

    <>
    <QueryClientProvider client={queryClient}>
    { checkToken() ? (
      <>
        <UserListReactQuery />
      </>
    ) : (
      <>
        <LoginForm />
      </>
    ) } 
    </QueryClientProvider>
</>

    
  );
}
