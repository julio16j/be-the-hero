import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation} from '@react-navigation/native';

import api from '../../services/api'
import logoImg from '../../assets/logo.png';
import styles from './styles';
export default function Incidents() {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([{id:1, name: 'SVTurtles', title: 'Save the turtles', value: 100, city: 'Rio de Janeiro', uf: 'RJ'}, {id:2, name: 'feedChildrens', title: 'Feed the childrens', value: 500, city: 'São Paulo', uf: 'SP'}]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  function NavigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  async function loadIncidents() {
    
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    /*const response = await api.get('/incidents',{
      params:{page}
    });*/
    setIncidents([...incidents]);
    setTotal(15);
    setPage(page+1);
    setLoading(false);

  }

  useEffect(() => {
    loadIncidents();
  }, [])

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total of <Text style={styles.headerTextBold}>{total} cases</Text>
        </Text>
      </View>
      <Text style={styles.title}>Hello There!</Text>
      <Text style={styles.description}>
        Choose one of the cases below and save the day.
      </Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>NGO: </Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
            
            <Text style={styles.incidentProperty}>CASE: </Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            
            <Text style={styles.incidentProperty}>Value: </Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD'}).format(incident.value)}
            </Text>
            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => { NavigateToDetail(incident) } }>
                <Text style={styles.detailsButtonText}>See more details</Text>
                <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}