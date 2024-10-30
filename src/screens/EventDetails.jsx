import React from "react";
import { Surface, Text, Button } from "react-native-paper";
import { View, StyleSheet, Image, ScrollView } from "react-native";

export default function EventDetailsScreen({ route, navigation }) {
  const { event } = route.params;  // O evento já contém as imagens na galeria

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
            {event.gallery?.slice(0, 2).map((imageUri, index) => (
              <Image
                key={index}
                source={{ uri: imageUri }}
                style={styles.topImage}
              />
            ))}
          </View>
          <View style={styles.bottomRow}>
            {event.gallery?.slice(2, 4).map((imageUri, index) => (
              <Image
                key={index}
                source={{ uri: imageUri }}
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
