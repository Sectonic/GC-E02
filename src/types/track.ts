
export type Track = {
  id: string;
  name: string;
  artists: {
    name: string;
  }[];
  album: {
    images: {
      url: string;
    }[];
  };
  description?: string;
}