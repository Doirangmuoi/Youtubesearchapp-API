import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import youtube from './api/youtube';
import VideoModal from './components/VideoModal';
import RegisterPage from './Page/Register.jsx';
import Login from './Page/Login.jsx';
const MOCK_VIDEOS = [
  {
    id: { videoId: '1' },
    snippet: {
      title: "Học ReactJS cho người mới bắt đầu",
      channelTitle: "Code Dạo",
      thumbnails: { medium: { url: "https://picsum.photos/seed/1/400/225" } },
      publishedAt: "2023-10-01"
    }
  },
  {
    id: { videoId: '2' },
    snippet: {
      title: "Tailwind CSS Tutorial",
      channelTitle: "Design Lab",
      thumbnails: { medium: { url: "https://picsum.photos/seed/2/400/225" } },
      publishedAt: "2023-11-15"
    }
  },
  // Thêm vài cái nữa để test grid...
];

function App() {
  const [videos, setVideos] = useState(MOCK_VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('ReactJS tutorial'); // Tìm mặc định

  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);

  const fetchVideos = async (query, pageToken = '') => {
    setLoading(true);
    try {
      const response = await youtube.get('/search', {
        params: {
          q: query,
          pageToken: pageToken
        }
      });
      setVideos(response?.data?.items);
      setNextPageToken(response?.data?.nextPageToken || null);
      setPrevPageToken(response?.data?.prevPageToken || null);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchVideos(searchTerm);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);


  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log("Đang tìm kiếm:", term);
  };

  const handlePageChange = (direction) => {
    const token = direction === 'next' ? nextPageToken : prevPageToken;
    if (token) {
      fetchVideos(searchTerm, token);
      window.scrollTo(0, 0); // Cuộn lên đầu trang khi qua trang mới
    }
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm py-4">
          <h1 className="text-center text-2xl font-bold text-red-600">MyTube Search</h1>
          <div className="w-12 ml-12 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM200 144l80 0c39.8 0 72 32.2 72 72 0 28.9-17 53.8-41.6 65.3l30.2 50.3c6.8 11.4 3.1 26.1-8.2 32.9s-26.1 3.1-32.9-8.2l-41-68.3-34.4 0 0 56c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-176c0-13.3 10.7-24 24-24zm72 96l8 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-56 0 0 48 48 0z"/>
              </svg>
          </div>
          <button className="flex whitespace-nowrap w-12 ml-2 place-content-between gap-5">
            <Link to="/register" className="text-blue-500 font-medium">
              Đăng kí
            </Link>
            <Link to="/login" className="text-blue-500 font-medium">
              Đăng nhập
            </Link>
          </button>
        </nav>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <SearchBar onSearch={handleSearch} />

        {loading ? (
            <div className="flex justify-center my-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
        ) : (
            <VideoList
                videos={videos}
                onVideoSelect={(video) => setSelectedVideo(video)}
                onPageChange={handlePageChange}
                hasNextPage={true}
                hasPrevPage={false}
            />)}
        {/* Modal hiển thị khi có video được chọn */}
        <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
        />
      </div>
  );
}

export default App;