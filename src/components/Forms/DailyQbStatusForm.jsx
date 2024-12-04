import {useRouter} from "next/navigation"
import { useEffect } from "react";
export default function DailyQbStatusForm({
    type,
    data,

}) {
    const router= useRouter();
 
    useEffect(() => {
        if(type === 'view')
            router.push(`/dailyQbStatus/${data.course}`)
    }, [])
    
    return <>
    
   
    
    
    </>
}