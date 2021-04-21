import React from "react";
import { View, ScrollView, FlatList, StyleSheet, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import customHeaderButton from "../../components/UI/customHeaderButton/customHeaderButton";
import SocialCard from "../../components/socialCard/SocialCard";

const SocialView = (props) => {
  const data = [
    {
      id: "1",
      title: "Developer 1",
      date: new Date().toISOString(),
      description: "A awesone landscape",
      owner: "@Jarellano",
      imageUrl:
        "https://cdn3.iconfinder.com/data/icons/roles-computer-it/128/front-end_developer-2-512.png",
    },
    {
      id: "2",
      title: "Developer 2",
      date: new Date().toISOString(),
      description: "Another Dev",
      owner: "@Lauu.ibarra",
      imageUrl:
        "https://cdn0.iconfinder.com/data/icons/startup-and-new-business-3/24/developer-woman-512.png",
    },
    {
      id: "3",
      title: "Hacker 1",
      date: new Date().toISOString(),
      description: "A Hack",
      owner: "@black.hack",
      imageUrl:
        "https://cdn0.iconfinder.com/data/icons/cyber-crime-or-threats-glyph/120/hacker_cyber_crime-512.png",
    },
  ];

  const onSelectHandler = (item) => {
    console.log("item", item);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      style={{ width: "100%" }}
      renderItem={(itemData) => (
        <SocialCard
          title={itemData.item.title}
          date={itemData.item.date}
          description={itemData.item.description}
          owner={itemData.item.owner}
          imageUrl={itemData.item.imageUrl}
          onSelect={() => onSelectHandler(itemData.item.id)}
        />
      )}
    ></FlatList>
  );
};

SocialView.navigationOptions = (navData) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={customHeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("Add");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    margin: 10,
  },
  scrollView: {
    width: "100%",
  },
});

export default SocialView;
