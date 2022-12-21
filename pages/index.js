import Head from 'next/head';
import Image from 'next/image';

import coffeeLogo from '../assets/coffee-logo.png'



import { useState } from 'react';



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
    const { output } = data;


    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  // Ask for your Motivation Letter !
  // Demandez votre lettre de motivation !
  // Give me some informations about you and the company you are looking for, I will do the rest !
  // Donnez moi quelques informations sur vous et l'organisation que vous visez, et je m'occupe du reste !
  // start typing heres. For instance : I'm honest, hard work, enthusiast. I would like to be hired in a new car repair shop in Saint-Nazaire, DLGA. The owner is looking for a secretary for appointments and welcome the customers.
  // Commencez par écrire ici, par exemple : Je m'appelle Myriam Bababoum, 51 ans.  Je suis honnête, travailleuse, pleine d'enthousiasme, mère de 2 jeunes filles pleine d'énergie dont je suis très fière. J'ai 30 ans d'expériences dans des domaines variés, dont 4 ans de parcours du monde, grimper au sommet de montagnes, la direction des ressources humaine dans des milieux variés, dont celui de l'autisme. Je voudrais intégrer l'équipe des Editions Papaouté, qui édite des livres pour les enfants atypiques et leurs parents.
  // Commencez par écrire ici, par exemple : Je m'appelle Michel, j'ai 20 ans, et je rêve de bosser pour Tesla. Je n'ai aucune expérience mais je suis hyper motive !
  return (
    <div className="root">
      <Head>
        <title>Lettre de Motivation</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Demandez votre scenario !</h1>
          </div>
          <div className="header-subtitle">
            <h2>Donnez moi un synopsys, et je m'occupe de rédiger votre scénario !</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="Commencez par remplacer ce message en cliquant / touchant dans le cadre puis en écrivant un synopsys"
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
                  <h3>Lettre de motivation</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
          <div className="contact">
            <h2>Contact: <a href="mailto:profpepite@proton.me" style={{ color: 'gray' }}>profpepite@proton.me</a></h2>
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