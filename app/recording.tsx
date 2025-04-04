// app/recording.tsx
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export const options = {
	title: "Grabación",
};

export default function RecordingScreen() {
	const router = useRouter();

	const handleRetry = () => {
		router.replace("/recording");
	};

	const handleFinish = () => {
		router.push("/analyzing");
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Comparación de Voz</Text>

			<Text style={styles.subtitle}>
				Puedes leer el siguiente texto, si no sabes qué decir:
			</Text>

			<Text style={styles.quote}>
				"No cualquiera puede convertirse en un gran artista, pero un gran
				artista puede provenir de cualquier lado. Es difícil para un crítico
				aceptar eso, pero al final debemos intentarlo."
			</Text>

			<View style={styles.buttonRow}>
				<TouchableOpacity style={styles.secondaryButton} onPress={handleRetry}>
					<Text style={styles.secondaryButtonText}>Volver a grabar</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.primaryButton} onPress={handleFinish}>
					<Text style={styles.primaryButtonText}>Finalizar Grabación</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 24,
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: { fontSize: 32, fontWeight: "bold", marginBottom: 20 },
	time: { fontSize: 16, color: "gray", marginBottom: 30 },
	subtitle: {
		fontSize: 18,
		color: "#333",
		marginBottom: 10,
		textAlign: "center",
	},
	quote: {
		fontSize: 16,
		fontStyle: "italic",
		textAlign: "center",
		marginBottom: 40,
		color: "#444",
	},
	buttonRow: {
		flexDirection: "column",
		width: "100%",
		gap: 16,
	},
	secondaryButton: {
		backgroundColor: "#A3A3A3",
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: "center",
	},
	secondaryButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	primaryButton: {
		backgroundColor: "#204389",
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: "center",
	},
	primaryButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});
