const assets = import.meta.glob('./assets/*.{gif,png}', {
  eager: true,
  query: '?url',
  import: 'default'
});
const assetKeys = Object.fromEntries(Object.keys(assets).map(key => ([key.replace("./assets/", "").replace(/\.\D+$/, ""), key])))

const cursorIds = [
  'black-cat',
  'brown-cat',
  'cat-sleepy',
  'deer',
  'dinosaur',
  'dog-pant',
  'chowchow',
  'frog',
  'lizard',
  'orange-cat',
  'peacock',
  'penguin',
  'persian-sparkle',
  'shihtzu',
  'trex-sparkle',
  'dolphin',
  'fish-1',
  'fish-2',
  'hummingbird',
];

export const CURSORS = Object.fromEntries(cursorIds.map((id => (
  [id, {
    id,
    file: assets[assetKeys[id]]
  }]
))));

console.log(CURSORS)