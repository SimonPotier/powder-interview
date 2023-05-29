// interface TypeEventProps {
//   title: string;
//   description: string;
//   id?: number;
//   user_id?: string;
// }

export const fetchClips = async () => {
  const result = await fetch("/api/clips");
  return result.json();
};
