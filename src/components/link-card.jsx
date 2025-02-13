import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Download, Trash } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

// Fetch Urls from API
const LinkCard = ({ url, fetchUrls }) => {
    const downloadImage =() => {
        const imageUrl =url?.qr;
        const fileName = url?.title;
        
        // create anchor tag using document.createElement
        const anchor =document.createElement("a");
        anchor.href = imageUrl;                     // set the href attribute and assign imageUrl
        anchor.download = fileName;                 // set the download attribute and assign fileName

        // append the anchor to the body of the document
        document.body.appendChild(anchor);         

        // Trigger the download by simulating a click event
        anchor.click(); 

        // remove the anchor from the body of the document
        document.body.removeChild(anchor);            
    };

    // fetch delete url from API
    const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, url?.id);


  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      {/* fetch the qr code from  the column qr in the url table   */}
      <img
        src={url?.qr}
        className="h-32 object-contain ring ring-blue-500 self-start"
        alt="qr code"
      />
      {/* Individual person have a  url page */}
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1 text-white">
        <span className="text-2xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>

        <span className="text-xl text-blue-400 font-bold hover:underline cursor-pointer">
          https://trimmer.in/{url?.custom_url ? url?.custom_url : url.short_url}{" "}
          {/* If have custom url then show custom url else short url*/}
        </span>

        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url} {/* To show original url*/}
        </span>

        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}{" "}
          {/* To show created time and date*/}
        </span>
      </Link>
      
      <div className="flex gap-2">
        {/* use Navigator function to navigate  and write text to the clipboard and copy this to the edit page(browser) */}
        <Button onClick={()=> 
            navigator.clipboard.writeText(`https://trimmer.in/${url?.short_url}`)
        }>
            <Copy/>
        </Button>
        <Button onClick={()=>downloadImage}>
            <Download/>
        </Button>
        <Button onClick={()=>fnDelete().then(()=> fetchUrls())}>             {/* After Delete then call the fetchUrls again*/} 

            {loadingDelete?<BeatLoader size={5} color="white" />:<Trash/>}   {/* If loading then show loader else show trash icon*/}
            
        </Button>

      </div>
    </div>
  );
};

export default LinkCard;
