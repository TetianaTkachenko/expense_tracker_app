import { Ionicons } from '@expo/vector-icons';
import { Pressable, View, StyleSheet } from 'react-native';

function IconButton({ name, size, color, onPress }) {
    return (
        <Pressable 
            onPress={onPress}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.iconContainer}>
                <Ionicons name={name} size={size} color={color} />
            </View>
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    iconContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 12,
        marginVertical: 4
    },
    pressed: {
        opacity: 0.75
    }
})