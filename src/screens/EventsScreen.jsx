import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Button, Surface, Text, Dialog, Portal } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function EventsScreen({ navigation }) {
  const [eventName, setEventName] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [description, setDescription] = useState("");
  const [gallery, setGallery] = useState([]);
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const pickCoverImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permissão para acessar a galeria é necessária!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCoverImage(result.assets[0].uri); // Define a imagem de capa
    }
  };

  const pickGalleryImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permissão para acessar a galeria é necessária!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setGallery([...gallery, result.assets[0].uri]); // Adiciona a imagem à galeria
    }
  };

  const handleSubmit = () => {
    if (!eventName.trim() || !coverImage || !description.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos e adicione uma imagem de capa.");
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title: eventName,
      subtitle: "Novo Evento",
      image: coverImage,
      date: new Date().toLocaleDateString(),
      description: description,
      icon: "calendar",
    };

    Alert.alert("Sucesso", "Evento criado com sucesso!");

    navigation.navigate("HomeScreen", { newEvent });
  };

  return (
    <Surface style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text style={styles.title}>Eventos</Text>

        {/* Botão para selecionar imagem de capa */}
        <Button mode="contained" onPress={pickCoverImage} style={styles.imageButton}>
          <Text style={{ color: "#fff" }}>Selecionar Imagem de Capa</Text>
        </Button>

        {/* Contêiner roxo para exibir a imagem de capa */}
        <View style={styles.coverImageContainer}>
          {coverImage && (
            <Image source={{ uri: coverImage }} style={styles.coverImage} />
          )}
        </View>

        {/* Campo para nome do evento */}
        <TextInput
          style={styles.input}
          placeholder="Nome do Evento"
          value={eventName}
          onChangeText={setEventName}
        />

        {/* Campo para descrição do evento */}
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Descrição do Evento"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        {/* Botão para adicionar fotos à galeria */}
        <Button mode="contained" onPress={pickGalleryImage} style={styles.galleryButton}>
          Adicionar Fotos à Galeria
        </Button>

        {/* Container para imagens da galeria */}
        <View style={styles.galleryContainer}>
          {gallery.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.galleryImage} />
          ))}
        </View>

        {/* Botão para criar evento */}
        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
          Criar Evento
        </Button>
      </ScrollView>

      {/* Diálogo para seleção de foto */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Selecionar Foto</Dialog.Title>
          <Dialog.Content>
            <Button onPress={pickGalleryImage}>Escolher Imagem</Button>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Footer com navegação */}
      <View style={styles.footer}>
        <Button onPress={() => navigation.navigate("EventsScreen")} mode="contained" style={styles.footerButton}>
          <MaterialCommunityIcons name="calendar" size={24} color="#a547bf" />
        </Button>
        <Button onPress={() => navigation.navigate("HomeScreen")} mode="contained" style={styles.footerButton}>
          <MaterialCommunityIcons name="home" size={24} color="#a547bf" />
        </Button>
        <Button onPress={() => navigation.navigate("BankScreen")} mode="contained" style={styles.footerButton}>
          <MaterialCommunityIcons name="bank" size={24} color="#a547bf" />
        </Button>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  innerContainer: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#a547bf",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: "top",
  },
  imageButton: {
    backgroundColor: "#a547bf",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    alignItems: "center",
  },
  coverImageContainer: {
    backgroundColor: "#a547bf",
    borderRadius: 8,
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  galleryButton: {
    backgroundColor: "#D8BFD8",
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
  },
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: "#C0C0C0",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    padding: 10,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
  },
  footerButton: {
    borderRadius: 8,
    backgroundColor: "transparent",
    flex: 1,
    marginHorizontal: 5,
  },
});
