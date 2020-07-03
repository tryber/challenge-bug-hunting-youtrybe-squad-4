const path = require('path');

const enviromentVariable = path.resolve(__dirname, '..', '..', '.env');

require('dotenv').config({ path: enviromentVariable });

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_AUTH_KEY = 'AIzaSyDBuOTCfHPhoq3NvmssqQfP5EdxaSf4bOU';

export const searchVideos = async (searchText) => {
  const URL = `${YOUTUBE_API_URL}/search?part=snippet&q=${searchText}&maxResults=25&key=${YOUTUBE_AUTH_KEY}`;

  try {
    const response = await fetch(URL);
    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
};

export const getVideoInfo = async (videoId) => {
  const urlParams = `part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${YOUTUBE_AUTH_KEY}`;
  const URL = `${YOUTUBE_API_URL}/videos?${urlParams}`;

  try {
    const response = await fetch(URL);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const getVideoComments = async (videoId) => {
  const urlParams = `part=snippet&videoId=${videoId}&textFormat=plainText&key=${YOUTUBE_AUTH_KEY}`;
  const URL = `${YOUTUBE_API_URL}/commentThreads?${urlParams}`;

  try {
    const response = await fetch(URL);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
