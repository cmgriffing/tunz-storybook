

export const loops = [
  'http://localhost:5000/Eamb1e-120.wav',
  'http://localhost:5000/Etam1u-120.wav',
  'http://localhost:5000/Fill1s-120.wav',
  'http://localhost:5000/Qtam1t-120.wav',
  'http://localhost:5000/Ride1f-120.wav',
  'http://localhost:5000/Stam1h-120.wav',
].map((item, index) => {
  return {
      name: `Loop #${index}`,
      id: index,
      file: item
  };
});

export const song = {
  bars: 32,
  name: 'Untitled Song',
  tempo: 120,
  tracks: new Array(4).fill().map((item, index) => {
    return {
      id: index,
      order: index,
      markers: [],
      loop: loops[index]
    };
  })
}