import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, ActivityIndicator } from 'react-native';

const apiKey = '03ebac67c48149b6b54d80f9d7c8101f'; 
const pageSize = 5; 

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchNews();
  }, [page]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=farming OR agriculture OR crops&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`);
      const data = await response.json();
      setHasMore(data.articles.length > 0);
      setNewsData((prevData) => [...prevData, ...data.articles]);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  if (loading && page === 1) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#EBB20E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Farming News</Text>
      <ScrollView>
        {newsData.map((newsItem, index) => (
          <View key={index} style={styles.newsItem}>
            <Image source={{ uri: newsItem.urlToImage }} style={styles.image} />
            <Text style={styles.heading}>{newsItem.title}</Text>
            <Text style={styles.description}>{newsItem.description}</Text>
          </View>
        ))}
      </ScrollView>
      {hasMore && (
        <Button title="Load More" onPress={loadMore} color="#EBB20E" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'outfit-mid',
    color: '#EBB20E',
    marginBottom: 10,
  },
  newsItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#8F8e8d',
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'outfit',
    color: '#EBB20E',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#8F8e8d',
  },
});


