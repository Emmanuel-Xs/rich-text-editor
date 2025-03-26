// Function to check if the URL is from YouTube
  export const isYouTubeUrl = (url: string) => {
    return url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/i);
  };

  // Function to get YouTube embed URL
  export const getYouTubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    const videoId = match && match[2].length === 11 ? match[2] : null;

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  // Function to check if the URL is from Vimeo
  export const isVimeoUrl = (url: string) => {
    return url.match(/^(https?:\/\/)?(www\.)?(vimeo\.com)/i);
  };

  // Function to get Vimeo embed URL
  export const getVimeoEmbedUrl = (url: string) => {
    const regExp =
      /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|)(\d+)(?:|\/\?)/;
    const match = url.match(regExp);

    const videoId = match ? match[1] : null;

    return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
  };