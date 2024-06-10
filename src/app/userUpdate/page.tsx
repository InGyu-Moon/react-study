'use client'
import UserUpdate from "../../components/UserUpdate";

import { useRouter } from 'next/router';

// import { useRouter } from 'next/navigation';

import { useParams } from 'next/navigation';
import { useEffect } from "react";

export default function Page() {

    const router = useRouter();
    // const { userEmail, nickname } = router.query;
    const userEmail = router.query.userEmail;
    const nickname = router.query.nickname;

    // const { userEmail,nickname } = useParams();

    // useEffect(() => {
    //     if (router.isReady) {
    //         const userEmail = router.query.userEmail;
    //         const nickname = router.query.nickname;
    //       }
    // }, [router.isReady]);

    
    console.log(userEmail, nickname);

    return (
        <UserUpdate userEmail={userEmail} nickname={nickname} />
    )
}