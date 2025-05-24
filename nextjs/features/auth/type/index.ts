export type TopThreePostImages = {
  topThreePostImages: TopThreePostImage[];
};

export type TopThreePostImage = {
  id: string;
  title: string;
  user: {
    name: string;
  };
  images: Image;
};

export type Image = {
  id: string;
  url: string;
  width: number;
  height: number;
};
