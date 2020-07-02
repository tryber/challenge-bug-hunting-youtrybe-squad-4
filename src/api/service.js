const path = require('path');
const enviromentVariable = path.resolve(__dirname, '..', '..', '.env');

require('dotenv').config({ path: enviromentVariable }); 

let YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_AUTH_KEY = process.env.REACT_APP_KEY;

console.log(YOUTUBE_AUTH_KEY)
export const searchVideos = async (searchText) => {
  const URL = `${YOUTUBE_API_URL}/search?part=snippet&q=${searchText}&maxResults=25&key=${'AIzaSyDBuOTCfHPhoq3NvmssqQfP5EdxaSf4bOU'}`;

  try {
    const response = await fetch(URL);
    const result = await response.json();
    
    return result;
  } catch (error) {
    return error;
  }


  // return new Promise((resolve, reject) => {
  //   resolve(
  //     fetch(URL)
  //       .then((data) => data)
  //       .catch(error => reject(error))
  //   );
  // })
};

export const getVideoInfo = (videoId) => {
  const urlParams = `part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${YOUTUBE_AUTH_KEY}`;
  const URL = `${YOUTUBE_API_URL}/videos?${urlParams}`;

  return new Promise((resolve, reject) => {
    resolve(
      fetch(URL)
        .then((data) => data)
        .catch(error => reject(error))
    );
  })
};

export const getVideoComments = (videoId) => {
  const urlParams = `part=snippet&videoId=${videoId}&textFormat=plainText&key=${YOUTUBE_AUTH_KEY}`;
  const URL = `${YOUTUBE_API_URL}/commentThreads?${urlParams}`;

  return new Promise((resolve, reject) => {
    resolve(
      fetch(URL)
        .then((data) => data)
        .catch(error => reject(error))
    );
  })
};
