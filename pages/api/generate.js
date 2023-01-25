import { Configuration, OpenAIApi } from 'openai';

// firebase 8.10.1
import firebase from 'firebase/app';
import 'firebase/database';

import { ANSI } from '../../utils/ansi_colors.js';

console.log(ANSI.GREEN + "\n*--- generate.js (re)STARTED ---*" + ANSI.RESET);


//=======================================================
//
// FUNCTION -> UUID
//
var UUID_COUNTER = 0
export function UUID() {
  UUID_COUNTER++;
  let days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let date = new Date();
  return (

    date.getFullYear() +
    "_" +
    ("0" + (date.getMonth() + 1)).slice(-2) + //BUG? Months start at 0
    "_" +
    ("0" + date.getDate()).slice(-2) +
    "_" +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ":" +
    ("0" + date.getSeconds()).slice(-2) +
    "," +
    ("000" + date.getMilliseconds()).slice(-3) +
    "_" +
    ("000000" + UUID_COUNTER).slice(-6)
  );
}
//
// FUNCTION -> UUID
//
//=======================================================


//=======================================================
//
// FIREBASE 8
//
// 1. init
const FIREBASE_DATABASE_URL = 'https://scenario-assistant-default-rtdb.europe-west1.firebasedatabase.app/'

const firebaseConfig = {
  databaseURL:
  FIREBASE_DATABASE_URL,
};
console.log(ANSI.BLUE + '\nFIREBASE_DATABASE_URL : ' + FIREBASE_DATABASE_URL + ANSI.RESET)
//
// 2. Initialize Firebase
const apptiti = firebase.initializeApp(firebaseConfig);
console.log(ANSI.GREEN + '... after firebase.initializeApp(firebaseConfig);' + ANSI.RESET)
const databasetiti = firebase.database();
console.log(ANSI.GREEN + '... after firebase.database();' + ANSI.RESET)
//
// 3.1 writeData, the write function !
function writeData(path, key, value) {
  firebase
    .database()
    .ref(path + '/' + key)
    .set(value);
}
//
// 3.3 let's send some data
writeData('logopenai-scenario', UUID(), { log: 'start OK' })
console.log(ANSI.GREEN + `... after writeData('logopenai-scenario', UUID(), { log: 'start OK' })` + ANSI.RESET)


//
// 4. read data if changed
/*
var newLogData = firebase.database().ref('logissim');
newLogData.on('value', (snapshot) => {
  const data = snapshot.val();
  for (const property in data) {
    let logMsg = data[property];
    console.log(`${property}: ${logMsg.message}`);
  }
});
*/
//
//=======================================================



const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  const OPENAI_REQUEST_DESCRIPTION_FR = `Ecriture d'un scénario de dessin animé en 7 actes.
  Le dernier acte doit permettre de bien comprendre la morale de l'histoire.
  Donner un titre en lettres majuscules à ce scénario.
  Si les noms des personnages ne sont pas donnés, les remplacer par des noms génériques (ex : le héros, le méchant, le père, la mère, le frère, la sœur, le grand-père, la grand-mère, le chien, le chat, le poisson rouge, etc...).
  Pour chaque acte :
  (1) Donner une description précise et imagée de l'environnement, encadrée de caractères #. 
  (2) Ajouter ensuite un échange entre les personnages. 
  (3) Ajouter entre paranthèses pour chacun des dialogues une description de l'état émotionnel du personnage, juste après son nom.
  (4) Chaque dialogue de chacun des personnage doit apparaitre sur une nouvelle ligne. 
  (5) Chaque échange doit comporter un minimum de 10 dialogues.
  (6) Ajouter un titre en lettres capitales.
  
  Synopsis :`

  const firstPrompt = `${OPENAI_REQUEST_DESCRIPTION_FR}${req.body.userInput}`;

  console.log(ANSI.CYAN + '\n' + firstPrompt + ANSI.GREEN + '...' + ANSI.RESET)



  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${OPENAI_REQUEST_DESCRIPTION_FR}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 1900,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  writeData('openai-scenario-serverside', UUID(), {
    brief: OPENAI_REQUEST_DESCRIPTION_FR,
    prompt: req.body.userInput,
    answer: `${req.body.userInput}${basePromptOutput.text}`
  })

  console.log(ANSI.GREEN + '...' + ANSI.BLUE + basePromptOutput.text + ANSI.RESET)

  res.status(200).json({ output: basePromptOutput });
};
// export !
export default generateAction;