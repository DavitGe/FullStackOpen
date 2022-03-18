import { FlatList, View, StyleSheet, Image } from 'react-native'

import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

import Text from '../styles/Text'
import theme from '../styles/theme'

const styles = StyleSheet.create({
  list: {
    // paddingTop: 8,
  },
  separator: {
    height: 10,
    backgroundColor: theme.backgroundColor,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 24,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: '#FFF',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    fontSize: 12,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 8,
    paddingLeft: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 48,
    marginRight: 48,
    marginTop: 14,
  },
  statsContainer: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
  },
})

const ItemSeparator = () => <View style={styles.separator} />
const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={{ flexDirection: 'row' }}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
      <View style={{ marginLeft: 8 }}>
        <Text fontSize="subheading">{item.fullName}</Text>
        <Text
          color="textSecondary"
          style={{ flexWrap: 'wrap', marginRight: 24 }}
        >
          {item.description}
        </Text>
        <Text style={styles.language}>{item.language}</Text>
      </View>
    </View>
    <View style={styles.stats}>
      <View style={styles.statsContainer}>
        <Text fontWeight="bold">
          {item.stargazersCount < 1000
            ? item.stargazersCount
            : Math.floor(item.stargazersCount / 1000).toString() + 'K'}
        </Text>
        <Text color="textSecondary">Stars</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text fontWeight="bold">
          {item.forksCount < 1000
            ? item.forksCount
            : Math.floor(item.forksCount / 1000).toString() + 'K'}
        </Text>
        <Text color="textSecondary">Forks</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text fontWeight="bold">
          {item.reviewCount < 1000
            ? item.reviewCount
            : Math.floor(item.reviewCount / 1000).toString() + 'K'}
        </Text>
        <Text color="textSecondary">Reviews</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text fontWeight="bold">
          {item.ratingAverage < 1000
            ? item.ratingAverage
            : Math.floor(item.ratingAverage / 1000).toString() + 'K'}
        </Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </View>
  </View>
)
const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })
  if (loading) {
    return <Text>Loading...</Text>
  } else {
    if (error) {
      return <Text style={styles.error}>{error}</Text>
    } else {
      const finalData = data.repositories.edges.map((obj) => obj.node)
      return (
        <FlatList
          style={styles.list}
          data={finalData}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => renderItem({ item })}
        />
      )
    }
  }
}

export default RepositoryList
