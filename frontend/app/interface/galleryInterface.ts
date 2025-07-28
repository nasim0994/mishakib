export type IGalleryCategory = {
  _id: string;
  title: string;
  order: number;
};

export type IGallery = {
  _id: string;
  image: string;
  category: IGalleryCategory;
};
