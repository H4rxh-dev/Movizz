import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const Detail = ({ route }) => {
  const { movie } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: movie.Poster }}
          style={styles.poster}
          resizeMode="cover"
        />

        <View style={styles.headerRow}>
          <Text numberOfLines={3} style={styles.title}>{movie.Title}</Text>
          <View style={styles.icons}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="heart-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="bookmark-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.metaContainer}>
          <Text style={styles.info}>🎬 Year: {movie.Year}</Text>
          <Text style={styles.info}>📚 Genre: {movie.Genre}</Text>
          <Text style={styles.info}>⏱ Runtime: {movie.Runtime}</Text>
          <Text style={styles.info}>🎬 Director: {movie.Director}</Text>
        </View>

        <View style={styles.plotContainer}>
                    <Text  style={styles.synopsis}>Synopsis/Plot :-</Text>

          <Text style={styles.plot}>{movie.Plot}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0a0c10',
    flex: 1,
  },
  poster: {
    width: '100%',
    height: 400,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 16,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 10,
  },
  icons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
    padding: 4,
  },
  metaContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  info: {
    color: '#aaa',
    fontSize: 15,
    marginTop: 6,
  },
  plotContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  plot: {
    color: 'white',
    fontSize: 15,
    lineHeight: 22,
  },
synopsis: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'semi-bold',
    paddingBottom: 10,
  },

});
