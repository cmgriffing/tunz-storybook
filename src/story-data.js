export const song = {
  bars: 32,
  name: 'Untitled Song',
  tempo: 120,
  tracks: new Array(4).fill().map((item, index) => {
    return {
      id: index,
      order: index,
      markers: [],
      loop: {
        name: `Loop #${index}`,
        id: index,
        file: 'http://localhost:5000/Eamb1e-120.wav'
      }
    };
  })
}

export const loops = new Array(4).fill().map((item, index) => {
  return {
      name: `Loop #${index}`,
      id: index,
      file: 'http://localhost:5000/Eamb1e-120.wav'
  };
});
