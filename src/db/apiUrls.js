import supabase, {supabaseUrl} from "./supabase";

export async function getUrls(user_id) {
  let {data, error} = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load URLs");
  }

  return data;
}

 //assign the function to the deleteUrls variable
 export async function deleteUrl(id) {
  const {data, error} = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error);                     // deleting a url
    throw new Error("Unable to delete Url");
  }

  return data;
}

// assign the function to the createURL variable
export async function createUrl({title, longUrl,customUrl, user_id}, qrcode) {
  // generate short url
  const short_url = Math.random().toString(36).substring(2,6);
  const fileName= `qr-${short_url}`;    // generate a filename for the qr code

  const {error:storageError} = await supabase.storage
    .from("Qrs")                        // name of bucket
    .upload(fileName, qrcode);   // upload the qrcode to the storage

  if (storageError) throw new Error(storageError.message);

  // create a new url
  const qr =  `${supabaseUrl}/storage/v1/object/public/Qrs/${fileName} `;  // get the url of the uploaded qr code


  const {data, error} = await supabase.from("urls").insert([
    {
      title,
      original_url: longUrl,
      custom_url: customUrl || null,
      user_id,
     short_url,
      qr,
    },
  ])
  .select();;

  if (error) {
    console.error(error);
    throw new Error("Error creating short URL");
  }

  return data;
}


