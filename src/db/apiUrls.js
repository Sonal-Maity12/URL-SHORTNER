
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

 // Get the URL from the database
export async function getUrl({id, user_id}) {           
  const {data, error} = await supabase                   
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Short Url not found");
  }

  return data;
}


// get the long url of a short url from the database
export const getLongUrl = async (id) => {
  try {
    const { data, error } = await supabase
      .from("urls")
      .select("id, original_url") // Use correct column names
      .eq("short_url", id) // Fix column name from `shortUrl` to `short_url`
      .single();

    if (error) throw error;
    if (!data) throw new Error("No URL found!");

    return data;
  } catch (error) {
    console.error("❌ Error in getLongUrl:", error);
    return null;
  }
};




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


 //assign the function to the deleteUrls variable
 export async function deleteUrl(id) {
  const {data, error} = await supabase
  .from("urls")
  .delete()
  .eq("id", id);            // delete the url with the id of the user

  if (error) {
    console.error(error.message);                     
    throw new Error("Unable to delete Url");
  }

  return data;
}


