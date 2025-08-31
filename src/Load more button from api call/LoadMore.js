

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LoadMore = () => {
  const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    border: '1px solid black',
    padding: '10px',
  };

  const [loading, setloading] = useState(false);
  const [item, setitem] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setloading(true);
        const response = await axios.get(
          'https://api.unsplash.com/photos/random',
          {
            params: { count: 10 },
            headers: {
              Authorization: `Client-ID q46kWjyGVGBb1O-ttu8bQYQe4G54eMAHIrbo6WxW4Wg`
            }
          }
        );
        setitem(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setloading(false);
      }
    };

    fetchImages();
  }, []);

  const handleLoadMore = async () => {
    try {
      setloading(true);

      const response = await axios.get(
        'https://api.unsplash.com/photos/random',
        {
          params: { count: 10 },
          headers: {
            Authorization: `Client-ID cINxUn9jGNIQcwPDrqMMoIUt9xUgNiOqxb1VxEbNcjk`
          }
        }
      );
      setitem(prev => [...prev, ...response.data]);
      setloading(false)
    } catch (error) {
      console.error('Error loading more:', error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className='parent'>
      {loading && <p>Loading...</p>}

      {item.length > 0 ? (
        <div style={style}>
          {item.map((img, index) => (
            <div key={index} className='card'>
              <img
                src={img.urls.small}
                alt={img.alt_description || 'unsplash more'}
                width={300}
                height={200}
              />
              <p>{img.alt_description || 'No description'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No images loaded</p>
      )}

       <button
        onClick={handleLoadMore}
        type='button'
        disabled={item.length >= 30 || loading}
      >
        {item.length >= 30 ? 'Limit Reached' : 'Load More'}
      </button>
    </div>
  );
};

export default LoadMore;
