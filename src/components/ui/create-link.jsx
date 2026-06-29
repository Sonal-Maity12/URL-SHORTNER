import { UrlState } from "@/context";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { Input } from "./input.jsx";
import Error from "../error";
import { Card } from "./card.jsx";
import * as yup from "yup";
import useFetch from "@/hooks/useFetch";
import { QRCode } from "react-qrcode-logo";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
  // we want information from the users & we can assign url to the correct user
  const { user } = UrlState();

  //we can navigate the user after the  URl has been created
  const navigate = useNavigate();
  const ref = useRef();

  //we'll have the searchparams  to get the data from the url
  let [searchParams, setSearchParams] = useSearchParams();

  //this is the long link that we want to shorten
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({}); // we'll store the errors here

  // Save form values, preferring the long link if given; otherwise, default, with custom URL support.
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  // Define the form schema: a required title, a required valid long URL, and an optional string for the custom URL.
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  // we'll use this function to validate the form
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, user_id: user.id }); // we'll use this function to create the url

  useEffect(() => {
    if (error === null && data) {
      console.log("URL created successfully:", data);
      navigate(`/link/${data[0].id}`);            // we'll navigate the user to the link page after the url has been created
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);

  // adding logic for creating url
  const createNewLink = async () => {
    setErrors([]);
  
    try {
      await schema.validate(formValues, { abortEarly: false }); // Validate form input
  
      const canvas = ref.current?.canvasRef?.current; // Get QR code canvas
      if (!canvas) throw new Error("QR code canvas is not available.");
  
      // Convert QR code canvas to Blob
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  
      console.log("Generated QR Code Blob:", blob); // Log the blob
  
      if (!blob) throw new Error("QR code blob could not be generated."); // Check if blob is null
  
      await fnCreateUrl(blob); // Pass the valid blob to createUrl function
    } catch (e) {
      console.error("Error creating link:", e);
      const newErrors = {};
      e.inner?.forEach((error) => (newErrors[error.path] = error.message));
      setErrors(newErrors);
    }
  };
  

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        // we'll close the dialog when the user clicks outside of it
        if (!res) setSearchParams({}); // if the dialog is closed, we'll reset the search params
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive">Create New Link</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-slate-900 variant = ghost text-white">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>

        {formValues?.longUrl && (
          <QRCode value={formValues?.longUrl} size={250} ref={ref} /> // we'll display the QR code here
        )}

        <Input
          id="title"
          placeholder="Short Link's Title"
          value={formValues.title}
          onChange={handleChange}
          className="bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-0 focus:outline-none"
        />
        {errors.title && <Error message={errors.title} />}

        <Input
          id="longUrl"
          placeholder="Enter Your Long URL"
          value={formValues.longUrl}
          onChange={handleChange}
          className="bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-0 focus:outline-none"
        />
        {errors.longUrl && <Error message={errors.longUrl} />}

        <div className="flex items-center gap-2">
          <Card className="p-2 bg-slate-800 text-white">trimmer.in</Card>/
          <Input
            id="customUrl"
            placeholder="Custom Link (optional)"
            value={formValues.customUrl}
            onChange={handleChange}
            className="bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-0 focus:outline-none"
          />
        </div>
        {error && <Error message={errors.message} />}

        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={createNewLink}
            disabled={loading}
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}{" "}
            {/* we'll display a loading animation here */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
