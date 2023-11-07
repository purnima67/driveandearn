import { useEffect, useState } from "react"; // Replace with your actual MusicComponent
import MediaCard from "./MediaCard";
import MusicPage from "@components/mediapages/MusicPage";
import PodcastPage from "@components/mediapages/PodcastPage";
import StoryPage from "@components/mediapages/StoryPage";
import MovieCard from "@components/mediapages/MovieCard";
interface MediaData {
  src: string;
  alt: string;
  title: string;
}

const mediaData: MediaData[] = [
  {
    src: "/music-image.png",
    alt: "Music",
    title: "Music",
  },
  {
    src: "/podcast-image.png",
    alt: "podcast",
    title: "Podcast",
  },
  {
    src: "/storie-image.jpg",
    alt: "stories",
    title: "Stories",
  },
  {
    src: "/movies-image.png",
    alt: "movies",
    title: "Movies",
  },
];

const MediaGallery: React.FC = (updateTimeSpent) => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [timeStart, setTimeStart] = useState<number | null>(null);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  const handleImageClick = (title: string) => {
    setTimeStart(Date.now());
    setSelectedMedia(title);
  };
  const closeModal = () => {
    if (timeStart !== null) {
      const currentTime = Date.now();
      const timeDifference = currentTime - timeStart;
      setTimeSpent(timeSpent + timeDifference); // Accumulate time spent on each media selection
      setTimeStart(null);

      const totalSeconds = Math.floor((timeSpent + timeDifference) / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const remainingSeconds = totalSeconds % 3600;
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;

      console.log(
        `Time spent: ${hours} hours, ${minutes} minutes, ${seconds} seconds`
      );
    }
    setSelectedMedia(null);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (selectedMedia) {
      timer = setInterval(() => {
        if (timeStart !== null) {
          const currentTime = Date.now();
          const timeDifference = currentTime - timeStart;
          setTimeSpent(timeSpent + timeDifference);
          setTimeStart(currentTime);
        }
      }, 1000);
    }

    return () => clearInterval(timer); // Clean up the interval when the component unmounts
  }, [selectedMedia, timeStart, timeSpent]);

  const handleSubmit = () => {
    // Perform actions on submitting the form within MusicPage
    console.log("Submit action performed");
  };
  const getMediaComponent = () => {
    switch (selectedMedia) {
      case "Music":
        return <MusicPage />;
      case "Podcast":
        return <PodcastPage />;
      case "Stories":
        
        return <StoryPage/>;
      case "Movies":
        return <MovieCard />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {mediaData.map((media, index) => (
          <MediaCard
            key={index}
            src={media.src}
            alt={media.alt}
            title={media.title}
            onClick={() => handleImageClick(media.title)}
          />
        ))}
      </div>
      <div className="mt-8 flex flex-col justify-center items-center">
        {selectedMedia && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-white rounded-lg shadow-lg md:w-3/4 lg:w-2/3 w-full flex flex-col">
              <div className="p-4">
                <button
                  onClick={closeModal}
                  className="text-gray-600 text-sm block p-2 hover:bg-gray-100 rounded"
                >
                  &larr; Back
                </button>
              </div>
              <div className="flex-1 flex justify-center">
                {getMediaComponent()}
              </div>
              <div className="text-center pb-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white mt-4 py-2 px-4 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
