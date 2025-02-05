import { ComponentProps, useEffect, useState } from 'react'
import * as Location from 'expo-location'
import {
  Text, StyleSheet, View, ScrollView, Dimensions,
  ActivityIndicator,
} from 'react-native'
import { Fontisto } from '@expo/vector-icons'

type FontistoNameType = ComponentProps<typeof Fontisto>['name']
const icons: {
  [key: string]: FontistoNameType
} = {
  Clouds: 'cloudy',
  Clear: 'day-sunny',
  Atmosphere: 'cloudy-gusts',
  Snow: 'snow',
  Rain: 'rains',
  Drizzle: 'rain',
  Thunderstorm: 'lightning',
}

type Location = {
  latitude: number
  longitude: number
}

const API_KEY = 'f1295eeafdbc5de5f98edeb0f0f13f56'

export default function Index () {
  const [city, setCity] = useState('Loading...')
  const [days, setDays] = useState<any[]>([])
  const [ok, setOk] = useState(true)

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync()
    if (!granted) {
      setOk(false)
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 })

    const location = await Location.reverseGeocodeAsync({ latitude, longitude })
    console.log(location[0].city)
    setCity(location[0].city || 'None')

    // 날씨 api 가 401 에러가 남 ㅠㅠ
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&lang=kr&appid=${API_KEY}&units=metric`)
    const json = await response.json()
    console.log(json)
    if (json.daily) setDays(json.daily)
  }

  useEffect(() => {
    getWeather()
  }, [])

  return (
    <View style={style.container}>
      <View style={style.city}>
        <Text style={style.cityName}>{city}</Text>
      </View>
      <ScrollView
        contentContainerStyle={style.weather}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {days.length === 0
          ? (
              <View style={style.day}>
                <Fontisto name='cloudy' size={68} color='white' />
                <ActivityIndicator style={{ marginTop: 10 }} color='white' size='large' />
              </View>
            )
          : days.map(({ weather, temp: { day } }, index) => (
            <View key={index} style={style.day}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={style.temp}>{parseFloat(day).toFixed(1)}</Text>
                <Fontisto name={icons[day.weather[0].main]} size={68} color='white' />
              </View>
              <Text style={style.description}>{weather[0].main}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  )
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },

  city: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
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
