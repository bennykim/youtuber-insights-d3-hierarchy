declare module "*.csv" {
  const content: any;
  export default content;
}

type Youtubers = {
  categories: string;
  comments: string;
  country: string;
  likes: string;
  links: string;
  rank: string;
  suscribers: string;
  username: string;
  visits: string;
};

interface HierarchyDatum {
  category: string;
  name: string;
  url: string;
  subs: number;
  likes: number;
  views: number;
  children?: Array<HierarchyDatum>;
}
