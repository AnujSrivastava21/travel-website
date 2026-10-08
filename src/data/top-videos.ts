export interface TopVideo {
  rank: number;
  label: string;
  title: string;
  views: string;
  href: string;
}

export const topVideos: TopVideo[] = [
  {
    rank: 1,
    label: "Highest Viewed",
    title: "My most viewed travel reel",
    views: "500K+",
    href: "https://www.instagram.com/reel/DdK6ukIz0VB/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
  },
  {
    rank: 2,
    label: "Top Reel",
    title: "Travel reel",
    views: "—",
    href: "https://www.instagram.com/p/Dc2UVmszEHl/",
  },
  {
    rank: 3,
    label: "Top Reel",
    title: "Travel reel",
    views: "—",
    href: "https://www.instagram.com/reel/DdBzVvvqn8q/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
  },
];