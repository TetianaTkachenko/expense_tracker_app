import { Text, TextInput, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/style';

function Input({ label, textInputConfig, style, invalid }) {

    const styleInput = [styles.input]

    if(textInputConfig && textInputConfig.multiline) {
        styleInput.push(styles.inputMultiline)
    }

    if(invalid) {
        styleInput.push(styles.invalidInput)
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>
                {label}
            </Text>
            <TextInput style={styleInput} {...textInputConfig} />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        borderRadius: 6,
        padding: 6,
        fontSize: 18
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
})