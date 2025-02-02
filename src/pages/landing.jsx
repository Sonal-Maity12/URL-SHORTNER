import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [longUrl, setLongUrl]= useState();
  const navigate=useNavigate()

  const handleShorten= (e) => {
    e.preventDefault()
    if(longUrl)navigate(`/auth?createNew=${longUrl}`)
  }
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-black text-center font-extrabold">
        The only URL Shortner <br /> you'll ever need!👇
      </h2>
      <form  onSubmit={handleShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your long  URL"
           onchange={(e)=>setLongUrl(e.target.value)}
          className="h-full flex-1 py-4 px-4"
        />
        <Button className="h-full" type="submit" variant="destructive">
          Shorten!
        </Button>
      </form>
      <img
        src="https://ps.w.org/url-shortify/assets/banner-772x250.png?rev=3175307"
        alt="banner"
        className="w-full my-11 md:px-11"
      />

      <Accordion type="multiple" collapsible className="w-full md:px-11  text-gray-900">
      <AccordionItem value="item-1">
          <AccordionTrigger>
           How was the Trimer URL shortner works?
          </AccordionTrigger>
          <AccordionContent>
           When you enter a long URL, our systen generates a shortner version 
           of that URl. This shortened URL redirects to the original long URL when 
           accessed. 
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
           Do I need an account to use the app?
          </AccordionTrigger>
          <AccordionContent>
          Yes, Creating an account allows you to manage your URLs, view
          analytics, and customize your short URLs. 
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
          What analytics are available for my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
         You can view the number of clicks,geolocation data of the clicks
          and device types(mobile/dekstop) for each of your shortened URLs.. 
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
