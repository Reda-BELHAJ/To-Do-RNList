import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper';

export default function FloatingButton({ navigation }) {
    
    return (
        <>
            <View style={styles.container}>
                <FAB
                    style={styles.fab}
                    color='white'
                    small
                    icon="plus"
                    onPress={() => navigation.navigate('CreateScreen')}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'tomato'
    },
})
