import supabase from "./supabase";

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

  