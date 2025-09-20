export type IProjectCategory = {
  _id: string;
  title: string;
  order: number;
};

export type IGallery = {
  _id: string;
  title: string;
  link: string;
  category: IProjectCategory;
};

export type IProject = {
  _id: string;
  name: string;
  thumbnail: string;
  banner: string;
  galleries?: IGallery[];
};
