// src/pages/SplashScreen.tsx
import React, { useEffect, useState } from 'react';
import { IonProgressBar, IonImg } from '@ionic/react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './SplashScreen.css'; // Ensure the path is correct
import logo from '../images/logo.svg';

const SplashScreen: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    console.log("splashscreen")
    const timer = setTimeout(() => {
      history.push('/wizard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      <IonContent className="ion-padding background">
        <div className="vertical-center">
          <div className="center">
          <IonImg src={logo} className='splash-logo'></IonImg>
          <IonProgressBar type="indeterminate"></IonProgressBar>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreen;