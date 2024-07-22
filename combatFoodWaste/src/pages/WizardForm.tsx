// src/pages/WizardForm.tsx
import React, { useState, ChangeEvent } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonInput, IonSelect, IonAlert,IonSelectOption, IonItem, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonFooter, IonButtons, IonIcon } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, search, personCircle, star } from 'ionicons/icons';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import predictionmage from '../images/predictionmage.jpeg';
import numeral from 'numeral';

const WizardForm: React.FC = () => {
  const [formData, setFormData] = useState({
    number_of_guests: '',
    quantity_of_food: '',
    pricing: '',
    preparation_method: '',
    geographical_location: ''
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [buttonWord, setButtonWord] = useState<string | null>('Reveal the Waste Magic!');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAbout = () =>{
    setIsOpen(true);
  }



  const handleSubmit = async () => {
    if (prediction === null) {
      setButtonWord("Let's start all over again!");
      try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        setPrediction(result.wastage_food_amount);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setPrediction(null);
      setButtonWord('Reveal the Waste Magic!');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton fill="solid" onClick={showAbout}>
              <IonIcon slot="icon-only" icon={helpCircle}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Help Us Safe Food!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        <IonAlert
          isOpen={isOpen}
          header="Combat Food Wastage"
          subHeader="The greatest threat to our planet is the belief that someone else will save it.” — Robert Swan"
          message="This application helps restaurants predict food wastage based on various factors like the number of guests,
        quantity of food prepared, pricing, preparation method, and geographical location. By accurately predicting
        food wastage, restaurants can take steps to reduce waste, save money, and contribute to a more sustainable
        environment."
          buttons={['Awesome! Got it!']}
          onDidDismiss={() => setIsOpen(false)}
        ></IonAlert>
        {prediction === null && (
          <form>
            <IonCard color="light">
              <IonCardHeader>
                <IonCardSubtitle>How Many Guests Are You Expecting?</IonCardSubtitle>
                {/* <IonCardTitle>Party Planner Extraordinaire!</IonCardTitle> */}
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  type="number"
                  name="number_of_guests"
                  placeholder="Number of guests"
                  value={formData.number_of_guests}
                  onIonChange={handleChange}
                />
              </IonCardContent>
            </IonCard>
            <IonCard color="light">
              <IonCardHeader>
                <IonCardSubtitle>How Many Food Are You Ordering?</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  type="number"
                  name="quantity_of_food"
                  placeholder='Quantity of Food'
                  value={formData.quantity_of_food}
                  onIonChange={handleChange}
                />
              </IonCardContent>
            </IonCard>
            <IonCard color="light">
              <IonCardHeader>
                <IonCardSubtitle>What is the Price of Your Feast?</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonSelect
                    name="pricing"
                    placeholder="Price per Person"
                    value={formData.pricing}
                    onIonChange={handleChange}
                  >
                    <IonSelectOption value="Low">Between MYR 10 - 100</IonSelectOption>
                    <IonSelectOption value="Moderate">Between MYR 200 - 1000</IonSelectOption>
                    <IonSelectOption value="High">More than 1000</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCardContent>
            </IonCard>
            <IonCard color="light">
              <IonCardHeader>
                <IonCardSubtitle>Choose Your Preferred Preparation Method (e.g., Buffet, Finget Food, Sit-Down Dinner)</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonSelect
                  name="preparation_method"
                  value={formData.preparation_method}
                  onIonChange={handleChange}
                  placeholder="Preparation method"
                >
                  <IonSelectOption value="Buffet">Buffet</IonSelectOption>
                  <IonSelectOption value="Finger Food">Finger Food</IonSelectOption>
                  <IonSelectOption value="Sit-Down Dinner">Sit-Down Dinner</IonSelectOption>
                </IonSelect>
              </IonCardContent>
            </IonCard>
            <IonCard color="light">
              <IonCardHeader>
                <IonCardSubtitle>Where would the feast be? (e.g., Rural, Suburban, Urban)</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonSelect
                  name="geographical_location"
                  value={formData.geographical_location}
                  onIonChange={handleChange}
                  placeholder="Location"
                >
                  <IonSelectOption value="Rural">Rural</IonSelectOption>
                  <IonSelectOption value="Suburban">Suburban</IonSelectOption>
                  <IonSelectOption value="Urban">Urban</IonSelectOption>
                </IonSelect>
              </IonCardContent>
            </IonCard>
          </form>
        )}
        {prediction !== null && (

          <IonCard>
            <img alt="Silhouette of mountains" src={predictionmage} />
            <IonCardHeader>
              <IonCardTitle>{numeral(prediction).format('0,0.00')} kg Foods Wasted</IonCardTitle>
              <IonCardSubtitle>You're estimated to have</IonCardSubtitle>
            </IonCardHeader>

          </IonCard>
        )}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton expand="block" onClick={handleSubmit}>{buttonWord}</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default WizardForm;