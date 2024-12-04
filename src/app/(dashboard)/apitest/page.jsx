'use client'

import { getAll } from '@/lib/Fetcher/fetchAllRecords';
import { useEffect } from 'react';


export default function APITestPage() {

  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/sections/viewSection/7fdc338e-1e86-4800-8a56-f29c2c5fa168`;

async function viewSection() {
  let res = await getAll(url);
  if (res.success) console.log(res.data);
  
}

useEffect(() => {
  viewSection();
}, [])

  return (
    <div></div>
  )
}
