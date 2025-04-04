// app/analyzing.tsx
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function AnalyzingScreen() {
	const router = useRouter();

	useEffect(() => {
		const timeout = setTimeout(() => {
			// You can randomize success/failure here if needed
			router.replace({ pathname: "/result", params: { success: "true" } });
		}, 3000);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Comparación de Voz</Text>

			<Text style={styles.message}>
				Tu grabación está siendo analizada.{"\n"}El análisis puede durar un par
				de minutos, no salgas de la aplicación.
			</Text>

			<ActivityIndicator
				size="large"
				color="#204389"
				style={{ marginTop: 40 }}
			/>
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
	message: {
		fontSize: 16,
		color: "#333",
		textAlign: "center",
		paddingHorizontal: 10,
	},
});
