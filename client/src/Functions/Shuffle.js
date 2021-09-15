export default function shuffle(tracks, first) {
  let accumulating = tracks;
  for (let i = tracks.length - 1; i >= 0; i--) {
    const randomNum = Math.floor(Math.random() * i);
    const thisIndex = tracks[i];
    if (first && thisIndex.uri === first.uri) {
      accumulating.splice(i, 1);
    } else {
      accumulating.splice(i, 1, tracks[randomNum]);
      accumulating.splice(randomNum, 1, thisIndex);
    }
  }
  return accumulating;
}
