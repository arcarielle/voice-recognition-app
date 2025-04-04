// app/index.tsx

export const options = {
	title: "Inicio",
};

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Comparación de Voz</Text>

			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push("/instructions")}
			>
				<Text style={styles.buttonText}>Presiona para comenzar</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: { fontSize: 32, fontWeight: "bold", marginBottom: 50 },
	time: { fontSize: 16, color: "gray", marginBottom: 40 },
	button: {
		backgroundColor: "#204389",
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 10,
	},
	buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
