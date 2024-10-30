import React from "react";
import { Surface, Text, Button } from "react-native-paper";
import { View, StyleSheet, Image, ScrollView } from "react-native";


const getAdditionalImages = (eventId) => {
  switch (eventId) {
    case '1':
      return [
        require('../../assets/img/livinho1.webp'),
        require('../../assets/img/livinho2.jpg'),
        require('../../assets/img/luna1.webp'),
        require('../../assets/img/luna2.jpeg'),
      ];
    case '2':
      return [
        require('../../assets/img/diad1.jpg'),
        require('../../assets/img/diad2.jpg'),
        require('../../assets/img/diad3.jpg'),
        require('../../assets/img/diad4.jpg'),
      ];

    default:
      return [
        require('../../assets/img/festa1.jpg'),
        require('../../assets/img/festa2.jpeg'),
        require('../../assets/img/festa3.jpeg'),
        require('../../assets/img/festa4.jpg'),
      ];
  }
};

export default function EventDetailsScreen({ route, navigation }) {
  const { event } = route.params;
  const additionalImages = getAdditionalImages(event.id); // Use o ID do evento para obter as imagens corretas

  return (
    <Surface style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.image }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.subtitle}>{event.subtitle}</Text>
        <Text style={styles.date}>{event.date}</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>
      <ScrollView>
        <View style={styles.photosContainer}>
          <View style={styles.topRow}>
            {additionalImages.slice(0, 2).map((image, index) => (
              <Image
                key={index}
                source={image}
                style={styles.topImage}
              />
            ))}
          </View>
          <View style={styles.bottomRow}>
            {additionalImages.slice(2, 4).map((image, index) => (
              <Image
                key={index}
                source={image}
                style={styles.bottomImage}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <Button
        onPress={() => navigation.goBack()}
        mode="contained"
        style={styles.button}
      >
        Voltar
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  photosContainer: {
    marginVertical: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topImage: {
    width: '48%',
    height: 100,
    borderRadius: 8,
  },
  bottomImage: {
    width: '48%',
    height: 100,
    borderRadius: 8,
  },
  button: {
    marginTop: 16,
    borderRadius: 30,
    backgroundColor: '#6200EE',
  },
});
