import Link from "next/link"

import { useEffect } from "react";
import { useRouter } from "next/router"

const NotFound = () => {
    const router = useRouter()
    
    useEffect(() => {
        setTimeout(() => {
            // router.go(-1) // go back one page
            router.push("/") //go back to the homepage
        }, 3000)
    }, [router])

    return ( 
        <div className="not-found">
            <h1>Oooops....</h1>
            <h2>That page cannot be found</h2>
            <p>Go back to <Link href="/">Home Page</Link></p>
        </div>
     );
}
 
export default NotFound;