import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import TextInput from '../Components/TextInput';
import PaperButton from '../Components/PaperButton';
import ColorChoice from '../Components/ColorChoice';
import { titleValidator, descValidator, skinValidator } from '../Core/Utils';
import { selectUser } from '../Reducer/authReducer'
import Firebase from '../../config/firebase';

import { theme } from '../Core/theme';

export default function CreateScreen({ navigation }) {
    const { uid } = useSelector(selectUser)

    const [title, setTitle] = useState({ value: '', error: '' });
    const [desc, setDesc] = useState({ value: '', error: '' });

    const [skin, setSkin] = useState({colorItem: '', icon: '', error: ''});

    const _onBtnPressed = async () => {
        const titleError = titleValidator(title.value);
        const descError = descValidator(desc.value);
        const skinError = skinValidator(skin.colorItem);

        if (titleError || descError || skinError) {
            setTitle({ ...title, error: titleError });
            setDesc({ ...desc, error: descError });
            setSkin({ ...skin, error: skinError });

            return; 
        }
        
        Firebase.database().ref('tasks/' + uid ).push().set({
            'title': title.value,
            'desc': desc.value,
            'color': skin.colorItem,
            'skin': skin.icon,
        });
        
        navigation.replace('HomeTab')
    }

    return (
        <View style={styles.container}>
            <TextInput
                label="Task Title"
                returnKeyType="next"
                value={title.value}
                onChangeText={text => setTitle({ value: text, error: '' })}
                error={!!title.error}
                errorText={title.error}
            />

            <TextInput
                label="Task Description"
                returnKeyType="next"
                multiline
                numberOfLines={4}
                value={desc.value}
                onChangeText={text => setDesc({ value: text, error: '' })}
                error={!!desc.error}
                errorText={desc.error}
            />

            <ColorChoice skin={skin} setSkin={setSkin} />

            {skin.error ? <Text style={styles.error}>{skin.error}</Text> : null}

            {/* Define Tasks add */}

            <PaperButton 
                mode="contained" 
                onPress={_onBtnPressed}
            >
                Add Track
            </PaperButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    error: {
        fontSize: 14,
        color: theme.colors.error,
        paddingHorizontal: 4,
        paddingTop: 4,
    },
})
