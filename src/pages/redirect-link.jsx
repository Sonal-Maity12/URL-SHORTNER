import { storeClicks } from '@/db/apiClicks';
import { getLongUrl } from '@/db/apiUrls';
import useFetch from '@/hooks/useFetch';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const RedirectLink = () => {
  const {id} = useParams();                             // Get the id from the URL

  const {loading, data, fn} = useFetch(getLongUrl, id);       // Fetch the long URL from the database

  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {               
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {                  
    fn();                         // Fetch the long URL when the component mounts
  }, []);

  useEffect(() => {                 
    if (!loading && data) {          // Check if data is available
      fnStats();                                 // Call the function to store clicks
    }
  }, [loading]);

  if (loading || loadingStats) {                   
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLink;
