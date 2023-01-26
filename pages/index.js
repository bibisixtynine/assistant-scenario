import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

import coffeeLogo from '../assets/coffee-logo.png'
import { ANSI } from '../utils/ansi_colors.js';

console.log(ANSI.GREEN + "\n*--- index.js (re)STARTED ---*" + ANSI.RESET);

const VERSION_NUMBER = 'v1.0.0.5'

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    //const data = {text:'OH YES'}

    const { output } = data;

    setApiOutput(`${userInput}${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Créateur de scénario</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Demandez votre scenario !</h1>
          </div>
          <div className="header-subtitle">
            <h2>Donnez moi quelques éléments dans le cadre ci-dessous (qui peut se limiter à par exemple : la cigale et la fourmi), et je m'occupe de rédiger votre scénario !</h2>
            <h2>Ensuite, appuyez sur 'GO!', et accordez moi entre 10 et 20s pour vous répondre!</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="Commencez par remplacer ce message en cliquant / touchant dans le cadre puis écrivez un résumé en quelques lignes, ou juste quelques éléments clés de votre histoire. "
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>GO!</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>L'histoire que j'ai rédigée pour vous :</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
          <div className="contact">
            <h2>Contact: <a href="mailto:profpepite@proton.me" style={{ color: 'gray' }}>profpepite@proton.me</a></h2>
            <p>{VERSION_NUMBER}</p>
          </div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://donate.stripe.com/00g15qbu32to4mY8ww"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={coffeeLogo} alt="coffee logo" />
            <p>offrir un café </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;