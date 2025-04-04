// app/result.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ResultScreen() {
	const router = useRouter();
	const { success } = useLocalSearchParams();

	const isSuccess = success === "true";

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Comparación de Voz</Text>

			<Text style={styles.resultText}>
				{isSuccess
					? "Después de analizar la voz, se encontraron suficientes similitudes para determinar que la voz es correcta."
					: "Después de analizar la voz, no se encontraron suficientes similitudes para determinar que la voz es correcta."}
			</Text>

			<TouchableOpacity
				style={styles.button}
				onPress={() => router.replace("/recording")}
			>
				<Text style={styles.buttonText}>Presiona para grabar otro audio</Text>
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
	title: { fontSize: 32, fontWeight: "bold", marginBottom: 10 },
	time: { fontSize: 16, color: "gray", marginBottom: 30 },
	resultText: {
		fontSize: 16,
		textAlign: "center",
		color: "#333",
		marginBottom: 40,
	},
	button: {
		backgroundColor: "#204389",
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 10,
	},
	buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
