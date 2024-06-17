'use client'
import UserDeleteForm from "@/components/UserDeleteForm";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "next/error";

export default function UserDelete(route:any){

    return(
        <div>
            {/* <ErrorBoundary fallback={<p>error</p>}>
                <UserDeleteForm userEmail={route.params.email}/>
            </ErrorBoundary> */}
            <UserDeleteForm userEmail={route.params.email}/>
        </div>
    )
}