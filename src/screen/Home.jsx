import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OMDBAPI } from '../apikey';

const Home = ({navigation}) => {
  const [showInput, setShowInput] = useState(false);
  const [searchText, setSearchText] = useState('');
  const inputAnim = useRef(new Animated.Value(0)).current;
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);


  const searchTerms = ['batman', 'avenger', 'superman', 'harry potter', 'mission impossible', 'crime'];

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const allResults = await Promise.all(
          searchTerms.map(async (term) => {
            const res = await axios.get('https://www.omdbapi.com/', {
              params: { apikey: OMDBAPI, s: term, type: 'movie', page: 1 },
            });
            return res.data.Search || [];
          })
        );

        const mergedResults = allResults.flat();
        const uniqueMovies = Array.from(new Map(mergedResults.map(m => [m.imdbID, m])).values());
        setPopularMovies(uniqueMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleSearchPress = () => {
    setShowInput(true);
    Animated.timing(inputAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleCancel = () => {
    Animated.timing(inputAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowInput(false);
      setSearchText('');
    });
  };

  const fetchMovies = async (query) => {
    try {
      setLoading(true);
      const res = await axios.get('https://www.omdbapi.com/', {
        params: { apikey: API_KEY, s: query, type: 'movie', page: 1 },
      });
      setPopularMovies(res.data.Search || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputTranslate = inputAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  const inputOpacity = inputAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      fetchMovies(searchText);
    }
  };

 const renderMovie = ({ item }) => {
 const fetchFullDetailsAndNavigate = async () => {
    try {
      const res = await axios.get('https://www.omdbapi.com/', {
        params: { apikey: OMDBAPI, i: item.imdbID, plot: 'full' },
      });
      navigation.navigate('Detail', { movie: res.data });
    } catch (err) {
      console.error('Failed to fetch movie details:', err);
    }
  };
  return (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={fetchFullDetailsAndNavigate}
    >
      {item.Poster !== 'N/A' ? (
        <Image source={{ uri: item.Poster }} style={styles.poster} />
      ) : (
        <View style={styles.noImage}>
          <Text style={{ color: 'white' }}>No Image</Text>
        </View>   
      )}
      <Text style={styles.movieTitle} numberOfLines={2} ellipsizeMode="tail">
        {item.Title}
      </Text>
      <Text style={styles.movieYear}>{item.Year}</Text>
    </TouchableOpacity>
  );
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {showInput ? (
          <Animated.View style={[styles.searchContainer, { opacity: inputOpacity, transform: [{ translateX: inputTranslate }] }]}>
            <TextInput
              placeholder="Search..."
              placeholderTextColor="#aaa"
              returnKeyType="search"
              style={styles.input}
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              onSubmitEditing={handleSearch}
              autoFocus
            />
            <TouchableOpacity onPress={handleCancel}>
              <Icon name="x" size={22} color="white" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <>
            <Text style={styles.title}>🎥 Moviez</Text>
            <TouchableOpacity onPress={handleSearchPress}>
              <Icon name="search" size={25} color="white" />
            </TouchableOpacity>
          </>
        )}
      </View>

      <Text style={styles.subheading}>Popular Movies</Text>

      {loading ? (
        <ActivityIndicator size="large" color="white" style={{ marginTop: 50 }} />
      ) : (
       <View style={{ height: 260 }}>
  <FlatList
    data={popularMovies}
    keyExtractor={(item) => item.imdbID}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.movieList}
    renderItem={renderMovie}
  />
</View>

      )}

      <Text style={styles.sectionTitle}>Recently Released and Trending</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0c10',
    paddingHorizontal: 20,
  },
  header: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subheading: {
    color: 'white',
    fontSize: 18,
    marginBottom: 15,
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 2,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    backgroundColor: '#1b252b',
    borderColor: 'white',
    paddingVertical: 8,
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  movieList: {
    paddingHorizontal: 0,
    marginLeft: 10,
    paddingBottom: 10,
  },
  movieCard: {
    marginRight: 20,
    alignItems: 'center',
    width: 160,
    overflow: 'hidden',
    backgroundColor: '#0a0c10',
  },
  poster: {
    width: 160,
    height: 200,
    borderRadius: 20,
  },
  noImage: {
    width: 160,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieTitle: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  movieYear: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 3,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    marginLeft: 10,
  },
});
