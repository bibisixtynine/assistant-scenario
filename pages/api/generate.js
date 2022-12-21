import { Configuration, OpenAIApi } from 'openai';

// firebase 8.10.1
import firebase from 'firebase/app';
import 'firebase/database';

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
const firebaseConfig = {
  databaseURL:
    process.env.FIREBASE_DATABASE_URL,
};
//
// 2. Initialize Firebase
const apptiti = firebase.initializeApp(firebaseConfig);
const databasetiti = firebase.database();
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
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {

  const firstPrompt = `${process.env.OPENAI_REQUEST_DESCRIPTION_FR}${req.body.userInput}`;
  console.log('=> firstPrompt:\n', firstPrompt)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${process.env.OPENAI_REQUEST_DESCRIPTION_FR}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 1900,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  writeData('openai-scenario-serverside', UUID(), {
    brief: process.env.OPENAI_REQUEST_DESCRIPTION_FR,
    prompt: req.body.userInput,
    answer: `${req.body.userInput}${basePromptOutput.text}`
  })

  console.log('\n=> xfirstPromptOutput', basePromptOutput.text)
  
  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;