import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';

  export default function App() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Ionicons name="shield-outline" size={48} color="#E30613" />
            <Text style={styles.title}>PallyPlay Junior</Text>
            <Text style={styles.subtitle}>Benfica Fan Club</Text>
            <Text style={styles.coins}>⭐ 147 Stars</Text>
          </View>

          <View style={styles.betCard}>
            <Text style={styles.betTitle}>Seuraava ottelu</Text>
            <Text style={styles.betMatch}>Benfica vs FC Porto</Text>
            <Text style={styles.betTime}>La 15.8. • 19:00</Text>

            <View style={styles.bettingOptions}>
              <TouchableOpacity style={styles.betButton}>
                <Text style={styles.betButtonText}>Benfica voittaa 5⭐</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.betButton}>
                <Text style={styles.betButtonText}>Tarkka tulos 15⭐</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.betButton}>
                <Text style={styles.betButtonText}>Ensimmäinen maali 10⭐</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <StatusBar style="dark" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    header: {
      alignItems: 'center',
      paddingVertical: 40,
      paddingHorizontal: 20,
      backgroundColor: '#E30613',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginTop: 12,
    },
    subtitle: {
      fontSize: 16,
      color: '#FFFFFF',
      opacity: 0.9,
      marginTop: 4,
    },
    coins: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginTop: 16,
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    betCard: {
      backgroundColor: '#fff',
      margin: 20,
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    betTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#E30613',
      marginBottom: 8,
    },
    betMatch: {
      fontSize: 20,
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: 4,
    },
    betTime: {
      fontSize: 14,
      color: '#666',
      marginBottom: 20,
    },
    bettingOptions: {
      gap: 12,
    },
    betButton: {
      backgroundColor: '#E30613',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: 'center',
    },
    betButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

