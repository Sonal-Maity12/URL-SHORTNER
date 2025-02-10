import React from 'react'
import { Link } from 'react-router-dom';

// Fetch Urls from API
const LinkCard = ({url, fetchUrls}) => {
  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">

     {/* fetch the qr code from  the column qr in the url table   */}
         <img src={url?.qr} 
         className="h-32 object-contain ring ring-blue-500 self-start"
         alt="qr code" 
        />  

        {/* Individual person have a  url page */}
        <Link to={`/link/${url?.id}`} className="flex flex-col flex-1 text-white">
        <span className="text-2xl font-extrabold hover:underline cursor-pointer">
            {url?.title}</span>
        <span className="text-xl text-blue-400 font-bold hover:underline cursor-pointer">
            https://trimrr.in/{url?.custom_url ? url?.custom_url : url.short_url}           {/* If have custom url then show custom url else short url*/}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
            {url?.original_url}                                                       {/* To show original url*/}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
            {new Date(url?.created_at).toLocaleString()}                        {/* To show created time and date*/}
        </span>
        </Link>                                   
    </div>
  )
}

export default LinkCard;