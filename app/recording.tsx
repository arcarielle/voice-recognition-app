// app/recording.tsx
export const options = {
	title: "Grabación",
};

import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";

import {
	Waveform,
	RecorderState,
	UpdateFrequency,
	useAudioPermission,
	PermissionStatus,
	IWaveformRef,
} from "@simform_solutions/react-native-audio-waveform";
import LottieView from "lottie-react-native";

export default function RecordingScreen() {
	const router = useRouter();

	const waveformRef = useRef<IWaveformRef>(null);
	const [recorderState, setRecorderState] = useState<RecorderState>(
		RecorderState.stopped
	);
	const { checkHasAudioRecorderPermission, getAudioRecorderPermission } =
		useAudioPermission();

	const [recording, setRecording] = useState<Audio.Recording | null>(null);
	const [isRecording, setIsRecording] = useState(false);
	const [recordingUri, setRecordingUri] = useState<string | null>(null);
	const [recordingDuration, setRecordingDuration] = useState<number | null>(
		null
	);
	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		(async () => {
			const permission = await Audio.requestPermissionsAsync();
			if (!permission.granted) {
				Alert.alert("Permiso requerido", "Se necesita acceso al micrófono.");
			}
		})();

		return () => {
			sound?.unloadAsync(); // Unload audio on unmount
		};
	}, []);

	const toggleRecording = async () => {
		if (recorderState === RecorderState.stopped) {
			const hasPermission = await checkHasAudioRecorderPermission();

			if (hasPermission === PermissionStatus.granted) {
				await waveformRef.current?.startRecord({
					updateFrequency: UpdateFrequency.high,
				});
			} else if (hasPermission === PermissionStatus.undetermined) {
				const permissionStatus = await getAudioRecorderPermission();
				if (permissionStatus === PermissionStatus.granted) {
					await waveformRef.current?.startRecord({
						updateFrequency: UpdateFrequency.high,
					});
				}
			} else {
				Alert.alert(
					"Permiso requerido",
					"Activa el acceso al micrófono en los ajustes."
				);
			}
		} else {
			const path = await waveformRef.current?.stopRecord();
			setRecordingUri(path ?? null);

			// Get duration
			if (path) {
				const { sound: tempSound } = await Audio.Sound.createAsync(
					{ uri: path },
					{},
					null,
					false
				);
				const status = await tempSound.getStatusAsync();
				if (status.isLoaded) {
					setRecordingDuration((status.durationMillis ?? 0) / 1000); // in seconds
				}
				await tempSound.unloadAsync();
			}
		}
	};

	const handleRetry = () => {
		setRecordingUri(null);
		setIsRecording(false);
		setRecordingDuration(null); // Clear duration

		if (sound) {
			sound.unloadAsync();
			setSound(null);
			setIsPlaying(false);
		}
	};

	const handleSend = () => {
		router.push("/analyzing");
	};

	const togglePlayback = async () => {
		if (!recordingUri) return;

		if (isPlaying) {
			await sound?.stopAsync();
			await sound?.unloadAsync();
			setSound(null);
			setIsPlaying(false);
		} else {
			const { sound: newSound } = await Audio.Sound.createAsync({
				uri: recordingUri,
			});
			setSound(newSound);

			const status = await newSound.getStatusAsync();
			if (status.isLoaded) {
				setRecordingDuration(Math.floor(status.durationMillis / 1000));
			}

			setIsPlaying(true);
			await newSound.playAsync();

			newSound.setOnPlaybackStatusUpdate((status) => {
				if (!status.isPlaying) {
					setIsPlaying(false);
				}
			});
		}
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

			{(!recordingUri || recorderState === RecorderState.recording) && (
				<Waveform
					mode="live"
					ref={waveformRef}
					containerStyle={{ width: "100%", height: 120, marginVertical: 20 }}
					waveColor="#204389"
					candleWidth={4}
					candleSpace={2}
					candleHeightScale={6}
					onRecorderStateChange={setRecorderState}
				/>
			)}

			{(!recordingUri || recorderState === RecorderState.recording) && (
				<TouchableOpacity
					onPress={toggleRecording}
					style={styles.lottieRow}
					activeOpacity={0.8}
				>
					<LottieView
						source={
							recorderState === RecorderState.recording
								? require("./assets/lottie/stop.json")
								: require("./assets/lottie/record.json")
						}
						autoPlay
						loop
						style={styles.lottie}
					/>
				</TouchableOpacity>
			)}

			{recordingUri && (
				<>
					<TouchableOpacity
						onPress={togglePlayback}
						style={[styles.lottieRow, { width: 120, height: 150 }]}
						activeOpacity={0.8}
					>
						<LottieView
							source={
								isPlaying
									? require("./assets/lottie/stop.json")
									: require("./assets/lottie/play.json")
							}
							autoPlay
							loop
							style={{
								width: isPlaying ? "100%" : "100%",
								height: isPlaying ? "50%" : "120%",
							}}
						/>
					</TouchableOpacity>

					{recordingDuration !== null && (
						<Text style={{ marginBottom: 16, fontSize: 16 }}>
							Duración: {recordingDuration} segundos
						</Text>
					)}

					<View style={styles.buttonRow}>
						<TouchableOpacity
							style={styles.secondaryButton}
							onPress={handleRetry}
						>
							<Text style={styles.secondaryButtonText}>Volver a grabar</Text>
						</TouchableOpacity>

						{recordingDuration !== null &&
						recordingDuration >= 8 &&
						recordingDuration <= 15 ? (
							<TouchableOpacity
								style={styles.primaryButton}
								onPress={handleSend}
							>
								<Text style={styles.primaryButtonText}>Enviar grabación</Text>
							</TouchableOpacity>
						) : (
							<Text
								style={{ color: "#d84c20", fontSize: 16, textAlign: "center" }}
							>
								La grabación debe durar entre 8 y 15 segundos para continuar.
							</Text>
						)}
					</View>
				</>
			)}
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
	recordButton: {
		backgroundColor: "#204389",
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 10,
		marginBottom: 20,
	},
	recordButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	playbackButton: {
		backgroundColor: "#68C2CA",
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 10,
		marginBottom: 20,
	},
	playbackButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
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

	lottieRow: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
	},

	lottie: {
		width: 120,
		height: 120,
	},
});
