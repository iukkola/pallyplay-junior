import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StatsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="trophy-outline" size={48} color="#E30613" />
        <Text style={styles.title}>Tilastot & Palkinnot</Text>
      </View>

      {/* Pelitilastot */}
      <View style={styles.statsCard}>
        <Text style={styles.sectionTitle}>Kauden tilastot</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Pelatut ottelut</Text>
          <Text style={styles.statValue}>24</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Voittoprosentti</Text>
          <Text style={styles.statValue}>67%</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Paras voittoputki</Text>
          <Text style={styles.statValue}>5 ottelua</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Tähdet yhteensä</Text>
          <Text style={styles.statValue}>⭐ 147</Text>
        </View>
      </View>

      {/* Trophy Cabinet */}
      <View style={styles.trophyCard}>
        <Text style={styles.sectionTitle}>🏆 Trophy Cabinet</Text>
        
        <Text style={styles.categoryTitle}>Benfican parhaat</Text>
        <View style={styles.trophyRow}>
          <View style={styles.trophy}>
            <Text style={styles.trophyIcon}>🥇</Text>
            <Text style={styles.trophyText}>Kultainen tähti</Text>
            <Text style={styles.trophyCount}>2x</Text>
          </View>
          <View style={styles.trophy}>
            <Text style={styles.trophyIcon}>🥈</Text>
            <Text style={styles.trophyText}>Hopeinen tähti</Text>
            <Text style={styles.trophyCount}>5x</Text>
          </View>
          <View style={styles.trophy}>
            <Text style={styles.trophyIcon}>🥉</Text>
            <Text style={styles.trophyText}>Pronssinen tähti</Text>
            <Text style={styles.trophyCount}>8x</Text>
          </View>
        </View>

        <Text style={styles.categoryTitle}>Kuukauden parhaat</Text>
        <View style={styles.trophyRow}>
          <View style={styles.trophy}>
            <Text style={styles.trophyIcon}>🟡</Text>
            <Text style={styles.trophyText}>Kultainen pallo</Text>
            <Text style={styles.trophyCount}>3x</Text>
          </View>
        </View>

        <Text style={styles.categoryTitle}>Kavereiden kanssa</Text>
        <View style={styles.trophyRow}>
          <View style={styles.trophy}>
            <Text style={styles.trophyIcon}>🥄</Text>
            <Text style={styles.trophyText}>Lusikat</Text>
            <Text style={styles.trophyCount}>12x</Text>
          </View>
          <View style={styles.trophy}>
            <Text style={styles.trophyIcon}>🏅</Text>
            <Text style={styles.trophyText}>Osallistumismitali</Text>
            <Text style={styles.trophyCount}>15x</Text>
          </View>
        </View>
      </View>

      {/* Viimeisimmät saavutukset */}
      <View style={styles.achievementsCard}>
        <Text style={styles.sectionTitle}>Viimeisimmät saavutukset</Text>
        <View style={styles.achievement}>
          <Text style={styles.achievementIcon}>🥇</Text>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>Viikon mestari</Text>
            <Text style={styles.achievementDate}>3 päivää sitten</Text>
          </View>
        </View>
        <View style={styles.achievement}>
          <Text style={styles.achievementIcon}>🥄</Text>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>Lusikka kaveriporukassa</Text>
            <Text style={styles.achievementDate}>1 viikko sitten</Text>
          </View>
        </View>
        <View style={styles.achievement}>
          <Text style={styles.achievementIcon}>🟡</Text>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>Elokuun kultainen pallo</Text>
            <Text style={styles.achievementDate}>2 viikkoa sitten</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  statsCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginBottom: 10,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trophyCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementsCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 10,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E30613',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  trophyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  trophy: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 100,
  },
  trophyIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  trophyText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  trophyCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E30613',
    marginTop: 4,
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  achievementDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});