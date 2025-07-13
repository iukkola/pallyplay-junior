import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TestUser {
  id: string;
  name: string;
  stars: number;
  avatar: string;
  group?: string;
}

interface TestGroup {
  id: string;
  name: string;
  members: TestUser[];
}

interface BetRecord {
  userId: string;
  userName: string;
  groupName?: string;
  bet: string;
  stars: number;
  timestamp: Date;
}

const finnishNames = [
  'Matti', 'Jussi', 'Jukka', 'Pekka', 'Antti', 'Mikko', 'Janne', 'Timo', 'Sami', 'Ville',
  'Anna', 'Maria', 'Liisa', 'Hanna', 'Sanna', 'Laura', 'Katja', 'Minna', 'Tiina', 'Päivi',
  'Oskari', 'Eetu', 'Lauri', 'Niko', 'Aleksi', 'Emma', 'Sofia', 'Aino', 'Ella', 'Venla'
];

const avatars = ['👦', '👧', '🧑', '👨', '👩', '🧒', '👶', '👴', '👵', '🧓'];

export default function TestDataGenerator() {
  const [users, setUsers] = useState<TestUser[]>([]);
  const [groups, setGroups] = useState<TestGroup[]>([]);
  const [bets, setBets] = useState<BetRecord[]>([]);
  const [dataGenerated, setDataGenerated] = useState(false);

  const generateTestData = () => {
    // Luo 30 käyttäjää
    const newUsers: TestUser[] = [];
    for (let i = 0; i < 30; i++) {
      newUsers.push({
        id: `user-${i}`,
        name: finnishNames[i],
        stars: Math.floor(Math.random() * 200) + 50,
        avatar: avatars[i % avatars.length],
      });
    }

    // Luo ryhmät
    const newGroups: TestGroup[] = [];
    let userIndex = 0;

    // UEFA PP Club - kaikki käyttäjät
    newGroups.push({
      id: 'uefa-club',
      name: 'UEFA PP Club',
      members: [...newUsers],
    });

    // 3 x 2 hengen ryhmää
    for (let i = 0; i < 3; i++) {
      const groupMembers = newUsers.slice(userIndex, userIndex + 2);
      newGroups.push({
        id: `group-2-${i}`,
        name: `Kaverit ${i + 1}`,
        members: groupMembers,
      });
      userIndex += 2;
    }

    // 4 x 3 hengen ryhmää
    for (let i = 0; i < 4; i++) {
      const groupMembers = newUsers.slice(userIndex, userIndex + 3);
      newGroups.push({
        id: `group-3-${i}`,
        name: `Tiimi ${i + 1}`,
        members: groupMembers,
      });
      userIndex += 3;
    }

    // 3 x 4 hengen ryhmää
    for (let i = 0; i < 3; i++) {
      const groupMembers = newUsers.slice(userIndex, userIndex + 4);
      newGroups.push({
        id: `group-4-${i}`,
        name: `Porukka ${i + 1}`,
        members: groupMembers,
      });
      userIndex += 4;
    }

    setUsers(newUsers);
    setGroups(newGroups);
    setDataGenerated(true);
  };

  const placeBet = (user: TestUser, group?: TestGroup) => {
    const betOptions = ['HJK voittaa', 'Tasapeli', 'IFK voittaa', 'Molemmat tekevät maalin'];
    const starOptions = [5, 10, 15, 20];
    
    const newBet: BetRecord = {
      userId: user.id,
      userName: user.name,
      groupName: group?.name,
      bet: betOptions[Math.floor(Math.random() * betOptions.length)],
      stars: starOptions[Math.floor(Math.random() * starOptions.length)],
      timestamp: new Date(),
    };

    setBets([...bets, newBet]);
    
    Alert.alert(
      'Veto asetettu',
      `${user.name} ${group ? `(${group.name})` : ''}\nVeto: ${newBet.bet}\nPanos: ${newBet.stars}⭐`,
      [{ text: 'OK' }]
    );
  };

  const placeAllBets = () => {
    Alert.alert(
      'Massaveto',
      'Haluatko asettaa vedon kaikkien 30 käyttäjän puolesta?',
      [
        { text: 'Peruuta', style: 'cancel' },
        { 
          text: 'Kyllä', 
          onPress: () => {
            const betOptions = ['HJK voittaa', 'Tasapeli', 'IFK voittaa', 'Molemmat tekevät maalin'];
            const starOptions = [5, 10, 15, 20];
            const newBets: BetRecord[] = [];

            users.forEach(user => {
              newBets.push({
                userId: user.id,
                userName: user.name,
                bet: betOptions[Math.floor(Math.random() * betOptions.length)],
                stars: starOptions[Math.floor(Math.random() * starOptions.length)],
                timestamp: new Date(),
              });
            });

            setBets([...bets, ...newBets]);
            Alert.alert('Valmis!', `${newBets.length} vetoa asetettu.`);
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="people-outline" size={48} color="#FFFFFF" />
        <Text style={styles.title}>Testidatan hallinta</Text>
        <Text style={styles.subtitle}>30 käyttäjää & ryhmät</Text>
      </View>

      {!dataGenerated ? (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Luo testidata</Text>
          <Text style={styles.description}>
            Tämä luo automaattisesti:{'\n'}
            • 30 käyttäjää{'\n'}
            • UEFA PP Club (kaikki käyttäjät){'\n'}
            • 3 x 2 hengen ryhmää{'\n'}
            • 4 x 3 hengen ryhmää{'\n'}
            • 3 x 4 hengen ryhmää
          </Text>
          <TouchableOpacity style={styles.generateButton} onPress={generateTestData}>
            <Ionicons name="create-outline" size={24} color="#FFFFFF" />
            <Text style={styles.generateButtonText}>Luo testidata</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Pikavedonlyönti */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Vedonlyönti</Text>
            <View style={styles.betStats}>
              <Text style={styles.statText}>Käyttäjiä: {users.length}</Text>
              <Text style={styles.statText}>Vetoja: {bets.length}</Text>
            </View>
            <TouchableOpacity style={styles.massButton} onPress={placeAllBets}>
              <Ionicons name="flash-outline" size={24} color="#FFFFFF" />
              <Text style={styles.massButtonText}>Aseta veto kaikille (30 vetoa)</Text>
            </TouchableOpacity>
          </View>

          {/* Käyttäjälista */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Käyttäjät ({users.length})</Text>
            <ScrollView style={styles.userList} horizontal>
              {users.map(user => (
                <TouchableOpacity
                  key={user.id}
                  style={styles.userChip}
                  onPress={() => placeBet(user)}
                >
                  <Text style={styles.userAvatar}>{user.avatar}</Text>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userStars}>⭐{user.stars}</Text>
                  {bets.some(b => b.userId === user.id) && (
                    <View style={styles.betIndicator} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={styles.helpText}>Klikkaa käyttäjää asettaaksesi vedon</Text>
          </View>

          {/* Ryhmälista */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Ryhmät ({groups.length})</Text>
            {groups.map(group => (
              <TouchableOpacity
                key={group.id}
                style={[
                  styles.groupItem,
                  group.id === 'uefa-club' && styles.mainGroup
                ]}
                onPress={() => {
                  const randomMember = group.members[Math.floor(Math.random() * group.members.length)];
                  placeBet(randomMember, group);
                }}
              >
                <View style={styles.groupInfo}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  <Text style={styles.groupMembers}>{group.members.length} jäsentä</Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Vetohistoria */}
          {bets.length > 0 && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Viimeisimmät vedot ({bets.length})</Text>
              {bets.slice(-5).reverse().map((bet, index) => (
                <View key={index} style={styles.betItem}>
                  <Text style={styles.betUser}>
                    {bet.userName} {bet.groupName && `(${bet.groupName})`}
                  </Text>
                  <Text style={styles.betDetails}>
                    {bet.bet} - {bet.stars}⭐
                  </Text>
                </View>
              ))}
            </View>
          )}
        </>
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
  card: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#003D7A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  massButton: {
    backgroundColor: '#00A652',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  massButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  betStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statText: {
    fontSize: 16,
    color: '#666',
  },
  userList: {
    maxHeight: 120,
  },
  userChip: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 12,
    marginRight: 8,
    alignItems: 'center',
    minWidth: 80,
    position: 'relative',
  },
  userAvatar: {
    fontSize: 32,
    marginBottom: 4,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  userStars: {
    fontSize: 12,
    color: '#666',
  },
  betIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00A652',
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  mainGroup: {
    backgroundColor: '#E8F0FE',
    padding: 12,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  groupMembers: {
    fontSize: 14,
    color: '#666',
  },
  betItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  betUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  betDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});