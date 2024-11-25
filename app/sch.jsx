import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Sch = () => {
  const [searchText, setSearchText] = useState("");
  const [wordCount, setWordCount] = useState(""); // Word count input
  const [qaList, setQaList] = useState([]); // List to hold scenes and generated images
  const [inputHeight, setInputHeight] = useState(50); // Initial height of the text box

  const generateImage = async (sceneText) => {
    console.log("Generating image...");
    try {
      const API_URL = "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image";
      const HEADERS = {
        Authorization: "Bearer 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",
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ inputs: sceneText }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate image for the scene: "${sceneText}". Status: ${response.status}`);
      }

      const imageBlob = await response.blob();
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(imageBlob); // Convert Blob to Base64 Data URL
      });

      return base64Data; // Return Base64 data URL
    } catch (error) {
      console.error("Error generating image:", error);
      return null; // Return null in case of error
    }
  };

  const handleSearch = async () => {
    console.log(`Input: ${searchText}, Word Limit: ${wordCount}`);
    if (searchText.trim()) {
      try {
        const response = await fetch("https://a1a7-34-142-219-255.ngrok-free.app/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: searchText,
            word_limit: wordCount ? parseInt(wordCount, 10) : 0, // Send word limit
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const scenes = await response.json(); // Response should be an array of scenes

        const updatedQaList = [];
        for (const scene of scenes) {
          const imageUrl = await generateImage(scene.scene_text); // Generate image for each scene
          updatedQaList.push({
            scene_no: scene.scene_no,
            scene_text: scene.scene_text,
            image: imageUrl,
          });
        }

        setQaList((prev) => [...prev, ...updatedQaList]); // Update QA list
        setSearchText(""); // Clear input fields
        setWordCount("");
      } catch (error) {
        console.error("Failed to fetch story:", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#FFF1DB" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Display the Q&A List */}
        {qaList.map((qa, index) => (
          <View
            key={index}
            style={{
              marginBottom: 15,
              backgroundColor: "#FEF9F2",
              borderRadius: 10,
              padding: 15,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 16, color: "#000", fontWeight: "bold" }}>
              Scene {qa.scene_no}:
            </Text>
            <Text style={{ fontSize: 16, color: "#000", marginTop: 5 }}>
              {qa.scene_text}
            </Text>
            {qa.image && (
              <Image
                source={{ uri: qa.image }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 10,
                  marginTop: 10,
                }}
                resizeMode="cover"
              />
            )}
          </View>
        ))}

        {/* Input Section */}
        <View style={{ marginTop: 20 }}>
          {/* Word Count Input */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <TextInput
              placeholder="Word count (optional)"
              value={wordCount}
              onChangeText={setWordCount}
              keyboardType="numeric"
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                padding: 10,
                fontSize: 16,
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            />
          </View>

          {/* Main Query Input */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 25,
              paddingHorizontal: 15,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <TouchableOpacity onPress={handleSearch}>
              <MaterialIcons name="search" size={24} color="#000" />
            </TouchableOpacity>
            <TextInput
              placeholder="Type your query..."
              value={searchText}
              onChangeText={setSearchText}
              multiline={true}
              onContentSizeChange={(event) => {
                setInputHeight(event.nativeEvent.contentSize.height);
              }}
              style={{
                flex: 1,
                fontSize: 16,
                paddingVertical: 10,
                paddingHorizontal: 10,
                height: Math.max(50, inputHeight),
              }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Sch;
