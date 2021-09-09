import React from 'react'
import { StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ColorChoice({skin, setSkin}) {
    const skins = [
        {colorItem: '#e54e77', icon: 'suitcase'},
        {colorItem: '#b15394', icon: 'user'},
        {colorItem: '#735895', icon: 'plane'},
        {colorItem: '#40547c', icon: 'gift'},
        {colorItem: '#2f4858', icon: 'leaf'}
    ]

    return (
        <FlatList
            horizontal
            data={skins}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 10}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity 
                        style={{
                            backgroundColor: item.colorItem,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: ( Dimensions.get('window').width - 30 ) / 5,
                            width: ( Dimensions.get('window').width - 30 ) / 5
                        }} 
                        onPress={() => {
                            setSkin(item)
                        }}
                    >
                        { 
                            skin.colorItem === item.colorItem ? (
                                <Icon name={item.icon} size={30} color="white" />
                            ) : null 
                        }
                    </TouchableOpacity>
                );
            }}
        />
    )
}

const styles = StyleSheet.create({})
