import supabase from "./supabase";
import { UAParser } from "ua-parser-js";

// export async function getClicksForUrls(urlIds) {
//     const {data, error}= await supabase
//     .from("clicks")
//     .select("*")
//     .in("url_id", urlIds);

//     if (!session.session) return null;
//     if (error) {
//         console.error(error.message);
//         throw new Error ("Unable to load Clicks");
//     }
//     return data;
// }


export async function getClicksForUrls(urlIds) {
  if (!Array.isArray(urlIds)) {
    throw new Error("urlIds must be an array");
  }

  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds.map(Number)); // Ensure IDs are integers

  if (error) {
    console.error("Supabase error:", error);
    throw new Error("Error fetching clicks");
  }

  return data;
}

const parser =new UAParser(); // create a new parser  

export const storeClicks = async ({id, originalUrl}) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop"; // Default to desktop if type is not detected

    const response = await fetch("https://ipapi.co/json");           // Get user's IP address
    const {city, country_name: country} = await response.json();

    // Record the click
    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });

    // Redirect to the original URL
    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error recording click:", error);
  }
};
  
