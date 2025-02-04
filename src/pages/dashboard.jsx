import { UrlState } from "@/context"; // Ensure this is the correct import
import Error from "@/components/error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.jsx";
import { BarLoader } from "react-spinners";
import { getUrls } from "@/db/apiUrls";
import { getClicksForUrls } from "@/db/apiClicks";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingClicks, setLoadingClicks] = useState(false);
  const [clicks, setClicks] = useState([]);
  
  const { user } = UrlState(); // Ensure 'user' comes from the context

  const { loading, error, data: urls, fn } = useFetch(getUrls, user?.id);

  // Fetching clicks for URLs
  useEffect(() => {
    if (urls?.length) {
      setLoadingClicks(true);
      getClicksForUrls(urls.map((url) => url.id)).then((data) => {
        setClicks(data);
        setLoadingClicks(false);
      });
    }
  }, [urls]);
  


  useEffect(() => {
    if (user?.id && fn) {
      fn(); // Fetch URLs only after user ID is available
    }
  }, [user?.id, fn]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col mt-20 gap-8">
      {(loading || loadingClicks) && <BarLoader width={"100%"} color="#36d7b7" />}

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
            <p>{clicks.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <Button>Create Link</Button>
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

      {error && <Error message={error?.message} />}
      {(filteredUrls || []).map((url,i) => {
        return url.title;
      })}
    </div>
  );
};

export default Dashboard;
