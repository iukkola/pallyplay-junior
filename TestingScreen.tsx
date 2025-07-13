import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TestUser {
  id: string;
  name: string;
  stars: number;
  avatar: string;
}

interface TestGroup {
  id: string;
  name: string;
  members: string[];
}

export default function TestingScreen() {
  const [users, setUsers] = useState<TestUser[]>([
    { id: '1', name: 'Matti', stars: 150, avatar: '👦' },
    { id: '2', name: 'Liisa', stars: 200, avatar: '👧' },
  ]);
  
  const [groups, setGroups] = useState<TestGroup[]>([
    { id: '1', name: 'HJK Fanit', members: ['1', '2'] },
  ]);

  const [newUserName, setNewUserName] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const avatars = ['👦', '👧', '🧑', '👨', '👩', '🧒'];

  const addUser = () => {
    if (newUserName.trim()) {
      const newUser: TestUser = {
        id: Date.now().toString(),
        name: newUserName,
        stars: Math.floor(Math.random() * 300) + 50,
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
      };
      setUsers([...users, newUser]);
      setNewUserName('');
    }
  };

  const addGroup = () => {
    if (newGroupName.trim() && selectedUsers.length > 0) {
      const newGroup: TestGroup = {
        id: Date.now().toString(),
        name: newGroupName,
        members: selectedUsers,
      };
      setGroups([...groups, newGroup]);
      setNewGroupName('');
      setSelectedUsers([]);
    }
  };

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const simulateBet = (userName: string, groupName?: string) => {
    const betFor = groupName ? `ryhmän ${groupName} puolesta` : 'omasta puolesta';
    Alert.alert(
      'Testiveto',
      `${userName} asetti vedon ${betFor}\nOttelu: HJK vs IFK Helsinki\nPanos: 10⭐`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="flask-outline" size={48} color="#FFFFFF" />
        <Text style={styles.title}>Testaustyökalut</Text>
        <Text style={styles.subtitle}>Feikkikäyttäjät & Ryhmät</Text>
      </View>

      {/* Lisää käyttäjä */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Lisää testikäyttäjä</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Käyttäjän nimi"
            value={newUserName}
            onChangeText={setNewUserName}
          />
          <TouchableOpacity style={styles.addButton} onPress={addUser}>
            <Text style={styles.addButtonText}>Lisää</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Käyttäjälista */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Testikäyttäjät</Text>
        {users.map(user => (
          <View key={user.id} style={styles.userItem}>
            <TouchableOpacity
              style={[
                styles.userCheckbox,
                selectedUsers.includes(user.id) && styles.userCheckboxSelected
              ]}
              onPress={() => toggleUserSelection(user.id)}
            >
              <Text style={styles.userAvatar}>{user.avatar}</Text>
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userStars}>⭐ {user.stars}</Text>
            </View>
            <TouchableOpacity
              style={styles.betButton}
              onPress={() => simulateBet(user.name)}
            >
              <Text style={styles.betButtonText}>Vedä</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Lisää ryhmä */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Luo testiryhmä</Text>
        <TextInput
          style={styles.input}
          placeholder="Ryhmän nimi"
          value={newGroupName}
          onChangeText={setNewGroupName}
        />
        <Text style={styles.helperText}>
          Valitut jäsenet: {selectedUsers.length} käyttäjää
        </Text>
        <TouchableOpacity
          style={[styles.addButton, { marginTop: 10 }]}
          onPress={addGroup}
          disabled={selectedUsers.length === 0}
        >
          <Text style={styles.addButtonText}>Luo ryhmä</Text>
        </TouchableOpacity>
      </View>

      {/* Ryhmälista */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Testiryhmät</Text>
        {groups.map(group => (
          <View key={group.id} style={styles.groupItem}>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupMembers}>
                {group.members.length} jäsentä
              </Text>
            </View>
            <TouchableOpacity
              style={styles.betButton}
              onPress={() => {
                const randomMember = users.find(u => group.members.includes(u.id));
                if (randomMember) {
                  simulateBet(randomMember.name, group.name);
                }
              }}
            >
              <Text style={styles.betButtonText}>Ryhmäveto</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Testiskenaario */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Nopea testiskenaario</Text>
        <TouchableOpacity 
          style={styles.scenarioButton}
          onPress={() => {
            Alert.alert(
              'Testiskenaario käynnistetty',
              'Luodaan 5 käyttäjää, 2 ryhmää ja 10 vetoa...',
              [{ text: 'OK' }]
            );
          }}
        >
          <Ionicons name="play-circle-outline" size={24} color="#FFFFFF" />
          <Text style={styles.scenarioButtonText}>Käynnistä massatesti</Text>
        </TouchableOpacity>
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
    backgroundColor: '#6C757D',
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
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#003D7A',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  userCheckbox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userCheckboxSelected: {
    borderColor: '#003D7A',
    backgroundColor: '#E8F0FE',
  },
  userAvatar: {
    fontSize: 24,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userStars: {
    fontSize: 14,
    color: '#666',
  },
  betButton: {
    backgroundColor: '#00A652',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  betButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  scenarioButton: {
    backgroundColor: '#6C757D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  scenarioButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});