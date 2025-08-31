// // import axios from "axios";
// // import React, { useEffect, useState } from "react";

// // const InfintiScoloring = () => {
// //   const [data, setData] = useState([]);
// //   const [current, setCurrent] = useState(false);

// //   const style = {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(4, 1fr)",
// //     gap: "10px",
// //     border: "1px solid black",
// //     padding: "10px",
// //   };

// //   const handlescoling = async () => {
// //     try {
// //       setCurrent(true);
// //       const responce = await axios.get(
// //         "https://api.unsplash.com/photos/random",
// //         {
// //           params: { count: 10},
// //           headers: {
// //             Authorization: `Client-ID vSsek9HGYI2EoRBaRNvJhRh8IyTuLNxOZE3AbcVcXP4`,
// //           },
// //         }
// //       );
// //       setData((prev) => [...prev, ...responce.data]);
// //     } catch (error) {
// //       console.error(`something went wrong${error}`);
// //     } finally {
// //       setCurrent(false);
// //     }
// //   };
// //   const handleusescolling=async (params) => {
// //     try {
// //     if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
// //       current((prev)=>prev+1)
// //     }
// //     } catch (error) {
// //         console.error(`something went wrong ${error}`)
// //     }
// //   }
// //   useEffect(() => {
// //     handlescoling();
// //   });
// //   useEffect(()=>{
// //     window.addEventListener("scroll",handleusescolling)
// //     return ()=>window.removeEventListener("scroll",handleusescolling)
// //   },[])
// //   return (
// //     <div>
// //       <h2>infinti InfintiScoloring</h2>
// //       {data.length > 0 ? (
// //         <div style={style}>
// //           {data.map((img, index) => (
// //             <div key={index} className="card">
// //               <img
// //                 src={img.urls.small}
// //                 alt={img.alt_description || "unsplash more"}
// //                 width={300}
// //                 height={200}
// //               />
// //               <p>{img.alt_description || "No description"}</p>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <p>No images loaded</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default InfintiScoloring;


// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const InfintiScoloring = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const style = {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 1fr)",
//     gap: "10px",
//     border: "1px solid black",
//     padding: "10px",
//   };

//   const fetchImages = async () => {
//     if (loading) return; // prevent multiple calls at once
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "https://api.unsplash.com/photos/random",
//         {
//           params: { count: 10 },
//           headers: {
//             Authorization: `Client-ID vSsek9HGYI2EoRBaRNvJhRh8IyTuLNxOZE3AbcVcXP4`,
//           },
//         }
//       );
//       setData((prev) => [...prev, ...response.data]);
//     } catch (error) {
//       console.error("Something went wrong:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScroll = () => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop + 1 >=
//       document.documentElement.scrollHeight
//     ) {
//       fetchImages();
//     }
//   };

//   useEffect(() => {
//     fetchImages(); // initial load
//   }, []);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div>
//       <h2>Infinite Scrolling</h2>
//       {data.length > 0 ? (
//         <div style={style}>
//           {data.map((img, index) => (
//             <div key={index} className="card">
//               <img
//                 src={img.urls.small}
//                 alt={img.alt_description || "unsplash image"}
//                 width={300}
//                 height={200}
//               />
//               <p>{img.alt_description || "No description"}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No images loaded</p>
//       )}
//       {loading && <p>Loading more images...</p>}
//     </div>
//   );
// };

// export default InfintiScoloring;


import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

const InfintiScoloring = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // renamed from current
  const [page, setPage] = useState(1); // control pagination

  const style = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    border: "1px solid black",
    padding: "10px",
  };

  // Wrapped in useCallback so dependencies are stable
  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://api.unsplash.com/photos/random", {
        params: { count: 10 },
        headers: {
          Authorization: `Client-ID q46kWjyGVGBb1O-ttu8bQYQe4G54eMAHIrbo6WxW4Wg`,
        },
      });
      setData((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Also wrapped in useCallback
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  }, []);

  // Fetch initial data and when page changes
  useEffect(() => {
    fetchImages();
  }, [page, fetchImages]);

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <h2>Infinite Scrolling</h2>
      {data.length > 0 ? (
        <div style={style}>
          {data.map((img, index) => (
            <div key={index} className="card">
              <img
                src={img.urls.small}
                alt={img.alt_description || "unsplash more"}
                width={300}
                height={200}
              />
              <p>{img.alt_description || "No description"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No images loaded</p>
      )}
      {loading && <p>Loading more...</p>}
    </div>
  );
};

export default InfintiScoloring;
