import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from './Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Qr from './Qr';

export default function Outpass({ route }) {
  const Navigation = useNavigation();
  const {
    destination,
    date,
    transport,
    outTime,
    name,
    rollno,
    purpose,
    status,
    issuedBy,
    issueDate,
    issueTime,
    id
  } = route.params;
  const [sname, setName] = useState('');
  const [srollno, setRollno] = useState('');
  const [role, setRole] = useState('student');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { role, token } = await retrieveStudentLogin();
    if (role && token) {
      try {
        const response = await axios.get(
          process.env.EXPO_PUBLIC_API_URL + `/${role}/outpass`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setName(response.data.data[0].student.name);
        setRollno(response.data.data[0].student.rollNumber);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    }
  };

  const retrieveStudentLogin = async () => {
    try {
      const role = await AsyncStorage.getItem('role');
      setRole(role);
      const token = await AsyncStorage.getItem('token');
      return { role, token };
    } catch (error) {
      console.error(error);
      return { role: null, token: null };
    }
  };

  const handleAccept = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.patch(
        process.env.EXPO_PUBLIC_API_URL + `/admin/outpass/${route.params.id}`,
        { status: 'Accepted' },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.data.status === 'Accepted')
        Navigation.navigate('ApplicationsPage');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReject = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.patch(
        process.env.EXPO_PUBLIC_API_URL + `/admin/outpass/${route.params.id}`,
        { status: 'Rejected' },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.data.status === 'Rejected')
        Navigation.navigate('ApplicationsPage');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Text style={styles.title}>{destination}</Text>
          <Chip
            style={[
              styles.chip,
              { backgroundColor: getStatusColor(status) },
            ]}
            textStyle={styles.chipText}
          >
            {status}
          </Chip>
        </View>
        <View style={styles.detailsContainer}>
          <DetailRow label="Date" icon="calendar" text={date} />
          <DetailRow label="Name" icon="user" text={sname} />
          <DetailRow label="Roll Number" icon="user" text={srollno} />
          <DetailRow label="Transport" icon="bus" text={transport} />
          <DetailRow label="Out Time" icon="clock-o" text={outTime} />
          <DetailRow label="Purpose of Visit" icon="user" text={purpose} />
        </View>
        <View style={[styles.issuedBy, { marginTop: 20 }]}>
          <Text style={{ color: 'white', padding: 4 }}>
            Issued By: {issuedBy}
          </Text>
          <Text style={{ color: 'white', padding: 4 }}>
            Issue Date: {issueDate}
          </Text>
          <Text style={{ color: 'white', padding: 4 }}>
            Issue Time: {issueTime}
          </Text>
        </View>
        {role == 'admin' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 32,
            }}
          >
            {status === 'Pending' && <Button
              style={{ borderColor: 'green', marginRight: 48 }}
              textColor="green"
              mode="outlined"
              icon="check"
              onPress={handleAccept}
            >
              Accept
            </Button>}
            {status === 'Pending' && <Button
              style={{ borderColor: 'red' }}
              textColor="red"
              mode="outlined"
              icon="close"
              onPress={handleReject}
            >
              Reject
            </Button>}
          </View>
        )}
        
        <StatusBar style="auto" />
        
      </View>
      {status==='Accepted' && role=='student' && <View style={styles.qrContainer}>
        <Qr value={id} />
      </View>}
    </ScrollView>
  );
}

const DetailRow = ({ label, icon, text }) => (
  <View style={styles.detailRow}>
    <Icon name={icon} style={styles.detailIcon} />
    <View>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailText}>{text}</Text>
    </View>
  </View>
);

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'orange';
    case 'Accepted':
      return 'green';
    case 'Rejected':
      return 'red';
    case 'Used':
      return 'blue';
    default:
      return 'black';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#370556',
    color: 'white',
    position: 'relative',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  chipText: {
    color: '#fff',
  },
  detailsContainer: {
    padding: 12,
    marginBottom: 0,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailIcon: {
    marginRight: 10,
    fontSize: 20,
    color: 'white',
  },
  detailLabel: {
    color: '#aaa',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: 'white',
  },
  qrContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, 
    padding: 20, 
  },
});
