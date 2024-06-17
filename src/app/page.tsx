'use client'
import { Suspense } from "react";
import UserList from "../components/UserList";
import Loading from "./loading";


export default function Home() {
  
  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <UserList />
      </Suspense>
    </div>
  );
}


