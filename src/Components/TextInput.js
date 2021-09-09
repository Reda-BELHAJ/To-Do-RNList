import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';

import { theme } from '../Core/theme';

export default function TextInput({ errorText, ...props }) {
    return (
        <View style={styles.container}>
            <Input
                theme={{ 
                    colors: { primary: theme.colors.primary, outlineColor: theme.colors.primary} 
                }}
                underlineColor="transparent"
                mode="outlined"
                {...props}
            />
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 8,
      },
    error: {
        fontSize: 14,
        color: theme.colors.error,
        paddingHorizontal: 4,
        paddingTop: 4,
    },
})
