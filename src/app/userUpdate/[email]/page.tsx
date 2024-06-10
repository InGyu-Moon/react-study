export default function RoomDetails({
    params:{email},
}:{params:{email:string}}){

    console.log(email);



    return(
        <>
        {email}
        </>
    )
}