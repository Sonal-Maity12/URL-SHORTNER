import Error from "@/components/error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlState } from "@/context";
import { getClicksForUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";

import { BarLoader } from "react-spinners";

const Dashboard = () => {

  const [searchQuery, setSearchQuery] =useState("");
  
  const {user}=UrlState();
  const {loading, error, data:urls, fn:fnUrls}=useFetch(getUrls, user.id);
  const {
    loading:loadingClicks,
    data:clicks,
    fn:fnClicks,
  } = useFetch(
    getClicksForUrls, 
    urls?.map((url)=> url.id)
  );

  useEffect(()=>{
    fnUrls();
  }, []);

  useEffect(() => {
    if(urls?.length)fnClicks(); 
    }, [urls?.length]);

    const filteredUrls = urls?.filter((url) =>
    url.title.toLowercase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div  className=" flex flex-col mt-20 p-4">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
    )}

      <div className="grid grid-cols-2 gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>0</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1 className="teaxt-4xl font-extrabold">My Links</h1>
        <Button>Create Link</Button>
      </div>

      <div className="relative mt-4">
        <Input type="text" placeholder="Filter links..." 
        value={searchQuery}
        conChang={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1"/> 
      </div>
      {/* {error &&<Error message={error?.message}/>} */}
    </div>
  );
};

export default Dashboard;
