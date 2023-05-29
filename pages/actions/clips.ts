/**
 * * Clips fetch actions
 */

export const fetchClips = async () => {
  const res = await fetch(
    "https://assets.dev.verse-core.vrse.gg/frontend-interview/data.json"
  );
  return await res.json();
};
