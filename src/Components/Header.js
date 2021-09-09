import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { theme } from '../Core/theme';

export default function Header({children}) {
    return (
        <Text style={styles.header}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    header: {
      fontSize: 26,
      color: theme.colors.primary,
      fontWeight: 'bold',
      paddingVertical: 10,
    },
});