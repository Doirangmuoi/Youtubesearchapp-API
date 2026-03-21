import axios from 'axios';

const KEY = 'AIzaSyCY7_n5zBBXrney-RgVxHHq8q3M_DO4_Yc';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 12,
        key: KEY,
        type: 'video'
    }
});