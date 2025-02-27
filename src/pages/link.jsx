import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Device from "@/components/ui/device-stats";
import Location from "@/components/ui/location-stats";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

const Link = () => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title; // Desired file name for the downloaded image

    // create anchor element using document.createElement
    const anchor = document.createElement("a");
    anchor.href = imageUrl; // set the href attribute and assign imageUrl
    anchor.download = fileName; // set the download attribute and assign fileName

    // append the anchor to the body of the document
    document.body.appendChild(anchor);

    // Trigger the download by simulating a click event
    anchor.click();

    // remove the anchor from the body of the document
    document.body.removeChild(anchor);
  };
  const { user } = UrlState();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id }); // get the url data from the server

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id); // get the url stats from the server

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard"); // redirect to dashboard if error
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url; // if custom_url is present, use it, otherwise use short_url
  }

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-3xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`https://trimmer.in/${link}`}
            target="_blank"
            className="text-xl sm:text-2xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            https://trimmer.in/{link}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>

          {/* use Navigator function to navigate  and write text to the clipboard and copy this to the edit page(browser) */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://trimmer.in/${url?.short_url}`
                )
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={() => downloadImage}>
              <Download />
            </Button>
            <Button variant="ghost" onClick={() => fnDelete()}>
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash /> // If loading then show loader else show trash icon
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain "
            alt="qr code"
          />
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-2xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats?.length ? (       // if stats is not null then show stats
            <CardContent className=" flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>   {/* show location data */}
              <Location stats={stats} />       
              <CardTitle>Device Info</CardTitle>      {/*  show device info */}
              <Device stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false           // If stats are not loading then show this message
                ? "No Statistics yet"
                : "Loading Statistics.."}         
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
