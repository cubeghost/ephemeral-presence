/*
  
  WARNING:
  THIS IS A BANNED WORDS FILTER 
  SO THERE ARE RACIAL SLURS ON IT
  DONT SCROLL DOWN UNLESS NECESSARY
  !!!!!!!!!!!!
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

*/

const wordlist = [
  '1488',
  'beaner',
  'bitch',
  'chink',
  'cunt',
  'dyke',
  'fag',
  'faggot',
  'faggots',
  'gook',
  'jigaboo',
  'kike',
  'kikes',
  'kyke',
  'nigga',
  'nigger',
  'niggers',
  'paki',
  'pewdiepie',
  'retard',
  'retarded',
  'sandnigger',
  'slut',
  'spic',
  'spick',
  'tard',
  'towelhead',
  'tranny',
  'trannies',
  'wetback',
  'whore'
];

const echoesRegexString = '\(\(\([^\(\)]+\)\)\)';
const wordRegexString = `(\b(${wordlist.join('|')})\b)`;

export function makeFilter() {
  return new RegExp(`${echoesRegexString}|${wordRegexString}`, 'gi');
};