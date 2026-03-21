import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import youtube from './api/youtube';
import VideoModal from './components/VideoModal';
// Dữ liệu mẫu để test UI
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
      setVideos(response.data.items);
      setNextPageToken(response.data.nextPageToken || null);
      setPrevPageToken(response.data.prevPageToken || null);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Chạy lần đầu khi load trang
  useEffect(() => {
    fetchVideos(searchTerm);
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchVideos(term);
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
        </nav>

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