'use client';

import {useRouter} from 'next/navigation';


export default function Error404() {

  

    const router = useRouter()

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-800 font-sans">
      <div className="text-center p-8 max-w-lg">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">Error404: Page not Found</h1>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, the page you are trying to access is not available at the moment.
        </p>
        <button  className="inline-block py-3 px-6 bg-blue-500/90 text-white text-lg font-medium rounded-lg hover:bg-blue-600 transition duration-300" onClick={router.back}>
             Click to go back
        </button>
      </div>
    </div>
  );
};


// Oops! Page Not Found
// Please go back!