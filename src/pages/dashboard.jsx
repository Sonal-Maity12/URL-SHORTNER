// can add sonner from shadcn ui after link created

import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Filter } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CreateLink from './../components/ui/create-link.jsx';

import LinkCard from "@/components/link-card";
import Error from "@/components/error";

import useFetch from "@/hooks/useFetch";

import { getUrls } from "@/db/apiUrls";
import { getClicksForUrls } from "@/db/apiClicks";
import { UrlState } from "@/context";


const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState(""); // search query // Searching for a specific URL
  const { user } = UrlState();
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id); // get all urls for user

  // get clicks for each url
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  //function call from  fnUrls()
  useEffect(() => {
    fnUrls();
  }, []);

  // We get filter of all urls with respect of title
  const filteredUrls = urls?.filter(                           // filter urls by search query  and title
    (url) => url.title.toLowerCase().includes(searchQuery.toLowerCase())   // convert in lowercase //check if it is in searchQuery then convert it in lowercase
  );

  //fnClick() function call
  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]); // dependency array

  return (
    <div className="flex flex-col mt-4 p-14 gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>                              {/* Number of urls*/ }
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>                             {/* Number of clicks*/ }
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink/>
        
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}                    {/* render error message if error is present*/}
      {(filteredUrls || []).map((url, i) => {                         {/* render my fillteredUrls*/}
        return <LinkCard key={i} url={url} fetchUrls={fnUrls} />
                                          
      })}
    </div>
  );
};

export default Dashboard;
