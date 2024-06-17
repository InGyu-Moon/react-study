// 'use client'
// export default function Error(){
//     return(
//         <div>
//             <h1>Error Page</h1>
//         </div>
//     );
// }

'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}