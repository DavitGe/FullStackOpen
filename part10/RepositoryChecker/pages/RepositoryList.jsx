import { FlatList, View, StyleSheet, Image } from 'react-native'
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

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
]

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
  return (
    <FlatList
      style={styles.list}
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => renderItem({ item })}
    />
  )
}

export default RepositoryList
