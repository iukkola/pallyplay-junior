import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Match {
  id: number;
  name: string;
  starting_at: string;
  state_id: number;
  participants?: Team[];
  scores?: Score[];
  events?: Event[];
  league?: League;
  round?: Round;
}

interface Team {
  id: number;
  name: string;
  short_code: string;
  logo_path?: string;
}

interface Score {
  id: number;
  fixture_id: number;
  type_id: number;
  participant_id: number;
  score: {
    goals: number;
    participant: string;
  };
}

interface Event {
  id: number;
  type_id: number;
  minute: number;
  participant_id: number;
  player_name?: string;
  detail?: string;
}

interface League {
  id: number;
  name: string;
  country?: {
    name: string;
    code: string;
  };
}

interface Round {
  id: number;
  name: string;
}

export default function SportsmonksService() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiToken, setApiToken] = useState('t5PdNteqAQ3fAJ4WE2kzhFEf03eXDFWSUjOY44t8jFKWTC5DW1gOCptPW15M');

  const fetchLiveMatches = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.sportmonks.com/v3/football/livescores/inplay?api_token=${apiToken}&include=participants;scores;periods;events;league.country;round`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Sportsmonks API Response:', data);

      // Jos data on array
      if (Array.isArray(data.data)) {
        setMatches(data.data);
      } 
      // Jos data on yksittäinen ottelu
      else if (data.data) {
        setMatches([data.data]);
      }
      // Jos ei dataa
      else {
        setMatches([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Tuntematon virhe');
      console.error('Sportsmonks API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTestMatch = async () => {
    setLoading(true);
    setError(null);

    try {
      // Testaa tietyllä ottelulla (Estoril vs Benfica)
      const response = await fetch(
        `https://api.sportmonks.com/v3/football/fixtures/19160788?api_token=${apiToken}&include=participants;scores;periods;events;league.country;round`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Test Match Data:', data);

      if (data.data) {
        setMatches([data.data]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Tuntematon virhe');
      console.error('Test Match Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Kokeile testiottelua app käynnistyessä
    fetchTestMatch();
  }, []);

  const getStateText = (stateId: number) => {
    const states: { [key: number]: string } = {
      1: 'Tulossa',
      2: 'Käynnissä',
      3: 'Päättynyt',
      22: 'Tulossa', // Estoril vs Benfica tila
    };
    return states[stateId] || `Tila ${stateId}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('fi-FI', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderMatch = (match: Match) => {
    const homeTeam = match.participants?.[0];
    const awayTeam = match.participants?.[1];
    const homeScore = match.scores?.find(s => s.participant_id === homeTeam?.id)?.score?.goals || 0;
    const awayScore = match.scores?.find(s => s.participant_id === awayTeam?.id)?.score?.goals || 0;

    return (
      <View key={match.id} style={styles.matchCard}>
        <View style={styles.matchHeader}>
          <Text style={styles.leagueName}>
            {match.league?.country?.name} - {match.league?.name}
          </Text>
          <Text style={styles.matchState}>{getStateText(match.state_id)}</Text>
        </View>

        <View style={styles.matchInfo}>
          <Text style={styles.matchTitle}>{match.name}</Text>
          <Text style={styles.matchTime}>{formatTime(match.starting_at)}</Text>
          
          {match.participants && (
            <View style={styles.teamsContainer}>
              <View style={styles.teamRow}>
                <Text style={styles.teamName}>{homeTeam?.name || 'Koti'}</Text>
                <Text style={styles.score}>{homeScore}</Text>
              </View>
              <View style={styles.teamRow}>
                <Text style={styles.teamName}>{awayTeam?.name || 'Vieras'}</Text>
                <Text style={styles.score}>{awayScore}</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.bettingButtons}>
          <TouchableOpacity style={styles.betButton}>
            <Text style={styles.betButtonText}>
              {homeTeam?.short_code || 'Koti'} voittaa 5⭐
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.betButton}>
            <Text style={styles.betButtonText}>Tasapeli 10⭐</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.betButton}>
            <Text style={styles.betButtonText}>
              {awayTeam?.short_code || 'Vieras'} voittaa 5⭐
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl 
          refreshing={loading} 
          onRefresh={fetchLiveMatches}
          tintColor="#003D7A"
        />
      }
    >
      <View style={styles.header}>
        <Ionicons name="football-outline" size={48} color="#FFFFFF" />
        <Text style={styles.title}>Sportsmonks Live</Text>
        <Text style={styles.subtitle}>Reaaliaikaiset ottelut</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.controlButton} 
          onPress={fetchLiveMatches}
          disabled={loading}
        >
          <Ionicons name="refresh" size={20} color="#FFFFFF" />
          <Text style={styles.controlButtonText}>Live-ottelut</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.controlButton} 
          onPress={fetchTestMatch}
          disabled={loading}
        >
          <Ionicons name="play" size={20} color="#FFFFFF" />
          <Text style={styles.controlButtonText}>Testiottelut</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorCard}>
          <Ionicons name="alert-circle" size={24} color="#DC3545" />
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorHint}>
            Varmista että API-avain on asetettu oikein
          </Text>
        </View>
      )}

      {loading && (
        <View style={styles.loadingCard}>
          <Ionicons name="sync" size={24} color="#003D7A" />
          <Text style={styles.loadingText}>Ladataan otteluita...</Text>
        </View>
      )}

      {matches.length > 0 ? (
        matches.map(renderMatch)
      ) : (
        !loading && !error && (
          <View style={styles.emptyCard}>
            <Ionicons name="calendar-outline" size={48} color="#666" />
            <Text style={styles.emptyText}>Ei käynnissä olevia otteluita</Text>
            <Text style={styles.emptyHint}>Kokeile testiottelua</Text>
          </View>
        )
      )}
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
    backgroundColor: '#003D7A',
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
  controls: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  controlButton: {
    flex: 1,
    backgroundColor: '#003D7A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  matchCard: {
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
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leagueName: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  matchState: {
    fontSize: 12,
    color: '#00A652',
    fontWeight: '600',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  matchInfo: {
    marginBottom: 16,
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  matchTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  teamsContainer: {
    gap: 8,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamName: {
    fontSize: 16,
    color: '#333',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003D7A',
  },
  bettingButtons: {
    gap: 8,
  },
  betButton: {
    backgroundColor: '#003D7A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  betButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  errorCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderColor: '#DC3545',
    borderWidth: 1,
  },
  errorText: {
    fontSize: 16,
    color: '#DC3545',
    marginTop: 8,
    textAlign: 'center',
  },
  errorHint: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  loadingCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#003D7A',
    marginTop: 8,
  },
  emptyCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
  },
  emptyHint: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});