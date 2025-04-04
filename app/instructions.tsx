// app/instructions.tsx
export const options = {
	title: "Instrucciones",
};

import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

export default function RecordingInstructionsScreen() {
	const router = useRouter();

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Comparación de Voz</Text>

			<View style={styles.lottieRow}>
				<LottieView
					source={require("./assets/lottie/talking.json")}
					autoPlay
					loop
					style={styles.lottie}
				/>
			</View>

			<Text style={styles.instructionText}>
				La grabación debe durar por lo menos 8 y hasta 15 segundos.
			</Text>

			<View style={styles.lottieRow}>
				<LottieView
					source={require("./assets/lottie/robot.json")}
					autoPlay
					loop
					style={styles.lottie}
				/>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push("/recording")}
			>
				<Text style={styles.buttonText}>Comienza a grabar</Text>
			</TouchableOpacity>
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
	title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
	lottieRow: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
		marginBottom: 10,
	},
	lottie: {
		width: 250,
		height: 250,
	},
	instructionText: {
		fontSize: 20,
		color: "#333",
		textAlign: "center",
		marginBottom: 10,
	},
	button: {
		backgroundColor: "#204389",
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 10,
	},
	buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
