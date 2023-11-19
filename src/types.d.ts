declare module "*.csv" {
  const content: any;
  export default content;
}

type Youtubers = {
  Categories: string;
  Comments: string;
  Country: string;
  Likes: string;
  Links: string;
  Rank: string;
  Suscribers: string;
  Username: string;
  Visits: string;
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
