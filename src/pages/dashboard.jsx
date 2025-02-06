import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { useState } from "react";

import { BarLoader } from "react-spinners";

const Dashboard = () => {

  const [searchQuery, setSearchQuery] =useState("")
  return (
    <div  className=" flex flex-col mt-20 p-4">
      {true && <BarLoader width={"100%"} color="#36d7b7" />}

      <div className="grid grid-cols-2 gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>0</p>
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
      
    </div>
  );
};

export default Dashboard;
