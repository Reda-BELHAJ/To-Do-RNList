import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import FloatingButton from '../Components/FloatingButton'
import { selectUser } from '../Reducer/authReducer'
import Firebase from '../../config/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler'

const useMountedState = () => {
    const mountedRef = useRef(false)
    const isMounted = useCallback(() => mountedRef.current, [])
  
    useEffect(() => {
      mountedRef.current = true
  
      return () => {
        mountedRef.current = false
      }
    }, [])
  
    return isMounted
  }

export default function HomeScreen({ navigation }) {
    const { uid } = useSelector(selectUser)
    const [ list, setList ] = useState(null)

    const isMounted = useMountedState();

    const getTasksData = () => {
        Firebase.database().ref('tasks/' + uid ).once('value')
        .then(function(snapshot) {
            var li = []
            snapshot.forEach((child)=>{
                li.push({
                    key: child.key,
                    title: child.val().title,
                    skin: child.val().skin,
                    desc: child.val().desc,
                    color: child.val().color
                })
            })
            setList(li)
        })
    }

    useEffect(() => {
        if (isMounted()) {
            getTasksData()
        }
    }, [isMounted]);

    return (
        <>
            <FlatList
                style={styles.container}
                data={list}
                keyExtractor={(item) => item.key}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={({item})=>{
                    return(
                        <View style={styles.cell}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name={item.skin} size={50} color='white' />
                                <Text
                                    numberOfLines={1} 
                                    ellipsizeMode='tail'
                                    style={styles.titleStyle}
                                >
                                    {item.title}
                                </Text>
                            </View>
                            <Text
                                numberOfLines={2} 
                                ellipsizeMode='tail'
                                style={styles.descStyle}
                            >
                                {item.desc}
                            </Text>
                        </View>)
                    }}
            />

            <FloatingButton navigation={navigation}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    cell: {
        backgroundColor: 'tomato', 
        height: ( Dimensions.get('window').width - 50 ) / 2,
        width: ( Dimensions.get('window').width - 50 ) / 2,
        margin: 5,
        padding: 10,
        borderRadius: 15,
    },
    titleStyle: {
        marginLeft: 10,
        marginRight: 40,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    descStyle: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'justify'
    }
})