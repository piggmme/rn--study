import {
  Text, StyleSheet, View, ScrollView, Dimensions,
} from 'react-native'

export default function Index () {
  return (
    <View style={style.container}>
      <View style={style.city}>
        <Text style={style.cityName}>Seoul</Text>
      </View>
      <ScrollView
        contentContainerStyle={style.weather}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <View style={style.day}>
          <Text style={style.temp}>27</Text>
          <Text style={style.description}>Sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temp}>27</Text>
          <Text style={style.description}>Sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temp}>27</Text>
          <Text style={style.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },

  city: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cityName: {
    fontSize: 68,
    marginTop: 80,
  },

  weather: {
  },

  day: {
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },

  temp: {
    fontSize: 178,
    marginTop: 50,
  },

  description: {
    marginTop: -30,
    fontSize: 48,
  },
})
