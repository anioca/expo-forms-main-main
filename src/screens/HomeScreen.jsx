import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Surface, Text, Card, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation, route }) {
  const [events, setEvents] = useState([]);

  // Carregar eventos salvos no AsyncStorage ao carregar a tela
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const savedEvents = await AsyncStorage.getItem('events');
        if (savedEvents !== null) {
          setEvents(JSON.parse(savedEvents));
        }
      } catch (error) {
        console.error("Erro ao carregar os eventos: ", error);
      }
    };
    loadEvents();
  }, []);

  // Salvar eventos no AsyncStorage apenas quando houver um novo evento
  useEffect(() => {
    if (route.params?.newEvent) {
      setEvents((prevEvents) => {
        // Verifica se o evento já existe, evitando duplicatas
        const eventExists = prevEvents.some(event => event.id === route.params.newEvent.id);
        if (!eventExists) {
          const updatedEvents = [...prevEvents, route.params.newEvent];
          saveEvents(updatedEvents); // Salvar eventos atualizados
          return updatedEvents;
        }
        return prevEvents;
      });
    }
  }, [route.params?.newEvent]);

  // Função para salvar eventos no AsyncStorage
  const saveEvents = async (updatedEvents) => {
    try {
      await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
    } catch (error) {
      console.error("Erro ao salvar os eventos: ", error);
    }
  };

  const handleEventPress = (event) => {
    navigation.navigate('EventDetails', { event });
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <Button
          onPress={() => navigation.navigate("HomeScreen")}
          mode="text"
          style={styles.initialButton}
          labelStyle={styles.initialButtonText}
        >
          Inicial
        </Button>
        <Button
          onPress={() => navigation.navigate("PerfilScreen")}
          mode="contained"
          style={styles.profileButton}
        >
          <MaterialCommunityIcons name="account" size={24} color="#a547bf" />
        </Button>
      </View>

      <ScrollView contentContainerStyle={styles.innerContainer}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Eventos Imperdíveis</Text>
        </View>
        {events.map((event, index) => (
          <Card key={index} style={styles.eventCard} onPress={() => handleEventPress(event)}>
            <Card.Cover
              source={{ uri: event.image }}
              style={styles.cardImage}
            />
            <Card.Title
              title={event.title}
              subtitle={event.subtitle}
              left={(props) => (
                <IconButton
                  {...props}
                  icon={event.icon}
                  style={styles.cardIcon}
                />
              )}
              titleStyle={styles.cardTitle}
              subtitleStyle={styles.cardSubtitle}
            />
            <Card.Content>
              <Text style={styles.eventDate}>{event.date}</Text>
              <Text style={styles.eventDescription}>{event.description}</Text>

              {/* Renderizando imagens da galeria */}
              <ScrollView horizontal contentContainerStyle={styles.galleryContainer}>
                {event.gallery?.map((imageUri, galleryIndex) => (
                  <Image
                    key={galleryIndex}
                    source={{ uri: imageUri }}
                    style={styles.galleryImage}
                  />
                ))}
              </ScrollView>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          onPress={() => navigation.navigate("EventsScreen")}
          mode="contained"
          style={styles.button}
        >
          <MaterialCommunityIcons name="calendar" size={24} color="#a547bf" />
        </Button>

        <Button
          onPress={() => navigation.navigate("HomeScreen")}
          mode="contained"
          style={styles.button}
        >
          <MaterialCommunityIcons name="home" size={24} color="#a547bf" />
        </Button>

        <Button
          onPress={() => navigation.navigate("BankScreen")}
          mode="contained"
          style={styles.button}
        >
          <MaterialCommunityIcons name="bank" size={24} color="#a547bf" />
        </Button>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  initialButton: {
    backgroundColor: 'transparent',
  },
  initialButtonText: {
    fontSize: 18,
    color: '#a547bf',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    padding: 10,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
    paddingTop: 60, // Para evitar sobreposição com o header
  },
  subtitleContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a547bf',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    margin: 20,
  },
  eventCard: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 6,
    backgroundColor: '#ffffff',
  },
  cardImage: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  eventDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 16,
    color: '#333',
  },
  cardIcon: {
    alignSelf: 'center',
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
    flex: 1,
    marginHorizontal: 5,
  },
  galleryContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
});
