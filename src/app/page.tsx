'use client'
import { Suspense } from "react";
import UserList from "../components/UserList";
import Loading from "./loading";

import UserListReactQuery from "@/components/UserListReactQuery";

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'



export default function Home() {
  
  const queryClient = new QueryClient()

  return (
    <div>
      {/* <Suspense fallback={<Loading/>}>
        <UserList />
      </Suspense> */}
      <QueryClientProvider client={queryClient}>
        <UserListReactQuery />
      </QueryClientProvider>
    </div>
  );
}


