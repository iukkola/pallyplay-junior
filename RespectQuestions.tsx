import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RespectQuestion {
  id: string;
  question: string;
  followUp?: string;
}

interface RespectQuestionsProps {
  visible: boolean;
  onComplete: (passed: boolean) => void;
  userName?: string;
  matchName?: string;
}

const respectQuestions: RespectQuestion[] = [
  {
    id: '1',
    question: 'Oletko kohdellut kavereitasi hyvin tänään?',
    followUp: 'Oletko varma, että olet kohdellut kavereitasi hyvin?'
  },
  {
    id: '2',
    question: 'Oletko kunnioittanut vastustajiasi?',
    followUp: 'Oletko todella kunnioittanut vastustajia?'
  },
  {
    id: '3',
    question: 'Oletko ollut reilu pelissä?',
    followUp: 'Oletko varmasti ollut reilu kaikissa tilanteissa?'
  },
  {
    id: '4',
    question: 'Oletko huolehtinut ympäristöstäsi?',
    followUp: 'Oletko todella huolehtinut ympäristöstäsi?'
  },
  {
    id: '5',
    question: 'Oletko ollut hyvä esimerkki muille?',
    followUp: 'Oletko varmasti ollut hyvä esimerkki?'
  },
  {
    id: '6',
    question: 'Oletko auttanut toisia tänään?',
    followUp: 'Oletko todella auttanut toisia?'
  }
];

export default function RespectQuestions({ visible, onComplete, userName, matchName }: RespectQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState<RespectQuestion | null>(null);
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * respectQuestions.length);
    return respectQuestions[randomIndex];
  };

  const startQuestions = () => {
    if (visible && !currentQuestion) {
      const question = getRandomQuestion();
      setCurrentQuestion(question);
      setIsFollowUp(false);
      setAttempts(0);
    }
  };

  React.useEffect(() => {
    startQuestions();
  }, [visible]);

  const handleAnswer = (answer: 'yes' | 'no') => {
    if (!currentQuestion) return;

    if (answer === 'yes') {
      // Oikea vastaus - hyväksy tulos
      Alert.alert(
        'Erinomaista! 🌟',
        `Tuloksesi on hyväksytty.\n\n${userName ? `${userName}, k` : 'K'}iitos että noudatat UEFA Respect -arvoja!`,
        [
          {
            text: 'Jatka',
            onPress: () => {
              setCurrentQuestion(null);
              onComplete(true);
            }
          }
        ]
      );
    } else {
      // Väärä vastaus
      if (!isFollowUp && currentQuestion.followUp) {
        // Kysy follow-up kysymys
        setIsFollowUp(true);
        setAttempts(attempts + 1);
      } else {
        // Hylkää tulos
        Alert.alert(
          'Pahoittelut 😔',
          `Tulostasi ei voida hyväksyä.\n\nMuista noudattaa UEFA Respect -arvoja:\n• Kunnioita kavereita\n• Kunnioita vastustajia\n• Ole reilu\n• Huolehdi ympäristöstä`,
          [
            {
              text: 'Yritä uudelleen',
              onPress: () => {
                // Aloita uudella kysymyksellä
                const newQuestion = getRandomQuestion();
                setCurrentQuestion(newQuestion);
                setIsFollowUp(false);
                setAttempts(0);
              }
            },
            {
              text: 'Poistu',
              style: 'cancel',
              onPress: () => {
                setCurrentQuestion(null);
                onComplete(false);
              }
            }
          ]
        );
      }
    }
  };

  const getCurrentQuestionText = () => {
    if (!currentQuestion) return '';
    return isFollowUp && currentQuestion.followUp ? currentQuestion.followUp : currentQuestion.question;
  };

  if (!visible || !currentQuestion) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => onComplete(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.uefaLogo}>
              <Text style={styles.uefaText}>UEFA</Text>
              <Text style={styles.respectText}>RESPECT</Text>
            </View>
            <Text style={styles.title}>Arvokysymys</Text>
            {matchName && (
              <Text style={styles.matchName}>{matchName}</Text>
            )}
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{getCurrentQuestionText()}</Text>
            
            {isFollowUp && (
              <View style={styles.followUpIndicator}>
                <Ionicons name="alert-circle" size={20} color="#FF6B35" />
                <Text style={styles.followUpText}>Mieti vielä kerran...</Text>
              </View>
            )}
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.yesButton]}
              onPress={() => handleAnswer('yes')}
            >
              <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
              <Text style={styles.buttonText}>Kyllä</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.noButton]}
              onPress={() => handleAnswer('no')}
            >
              <Ionicons name="close-circle" size={24} color="#FFFFFF" />
              <Text style={styles.buttonText}>Ei</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Emotion • Excitement • Respect
            </Text>
            <Text style={styles.footerSubtext}>
              Lue kysymys huolellisesti ja vastaa rehellisesti
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  uefaLogo: {
    backgroundColor: '#003D7A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  uefaText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  respectText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00A652',
    textAlign: 'center',
    letterSpacing: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003D7A',
    textAlign: 'center',
  },
  matchName: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  questionContainer: {
    marginBottom: 32,
  },
  questionText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '500',
  },
  followUpIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  followUpText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  yesButton: {
    backgroundColor: '#00A652',
  },
  noButton: {
    backgroundColor: '#DC3545',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    fontSize: 14,
    color: '#003D7A',
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});