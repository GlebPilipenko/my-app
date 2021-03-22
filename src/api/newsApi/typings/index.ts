type SourceType = {
  id: string;
  name: string;
};

export type NewsAPIType = {
  status: string;
  totalResults: number;
  articles: ArticlesType[];
};

export type ArticlesType = {
  source: SourceType;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};
