// src/pages/InfoPage.tsx
import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const InfoPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>About Combat Food Waste</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <h2>Combat Food Waste</h2>
      <p>
        This application helps restaurants predict food wastage based on various factors like the number of guests,
        quantity of food prepared, pricing, preparation method, and geographical location. By accurately predicting
        food wastage, restaurants can take steps to reduce waste, save money, and contribute to a more sustainable
        environment.
      </p>
    </IonContent>
  </IonPage>
);

export default InfoPage;