import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Alert,
  FlatList,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import customHeaderButton from "../../components/UI/customHeaderButton/customHeaderButton";
import SocialCard from "../../components/socialCard/SocialCard";
import { getPlaces } from "../../store/actions/places";
import Colors from "../../constants/Colors";

const SocialView = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const data = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  const loadPlaces = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(getPlaces());
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsRefreshing]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadPlaces);

    return () => {
      willFocusSub.remove();
    };
  }, [loadPlaces]);

  useEffect(() => {
    if (error) {
      Alert.alert("Alert", error, [{ text: "Ok" }]);
    }
  }, [error]);

  useEffect(() => {
    setIsLoading(true);
    loadPlaces()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [dispatch, loadPlaces]);

  const onSelectHandler = (item) => {
    props.navigation.navigate("Details", {
      placeId: item.id,
      placeTitle: item.title,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <FlatList
      data={data}
      onRefresh={loadPlaces}
      refreshing={isRefreshing}
      keyExtractor={(item) => item.id}
      style={{ width: "100%" }}
      renderItem={(itemData) => (
        <SocialCard
          title={itemData.item.title}
          date={itemData.item.date}
          description={itemData.item.description}
          owner={itemData.item.ownerId}
          imageUrl={itemData.item.imageUrl}
          onSelect={() => onSelectHandler(itemData.item)}
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
