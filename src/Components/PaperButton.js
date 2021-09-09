import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { theme } from '../Core/theme';

export default function PaperButton({ mode, style, children, ...props }) {
    return (
        <Button
            theme={{ 
                colors: { primary: theme.colors.primary} 
            }}
            style={[
                styles.button,
                mode === 'outlined' ? { backgroundColor: 'transparent' } : { backgroundColor: theme.colors.primary },
                    style,
            ]}
            labelStyle={[
                mode === 'outlined' ? { color: theme.colors.primary }: { color: 'white' },
                styles.text
            ]}
            mode={mode}
            {...props}
        >
            {children}
        </Button>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginVertical: 8,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26
    },
})
