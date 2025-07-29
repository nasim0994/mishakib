export type IProjectCategory = {
  _id: string;
  title: string;
  order: number;
};

export type IProject = {
  _id: string;
  name: string;
  thumbnail: string;
  banner: string;
  galleries?: {
    _id: string;
    title: string;
    link: string;
  }[];
  category: IProjectCategory;
};
