import axios from 'axios';

const KEY = 'AIzaSyBNjJxD5LnvqUP4cnp5In4YgAuSFx44caw';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 12,
        key: KEY,
        type: 'video'
    }
});