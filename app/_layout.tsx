import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				headerTitleAlign: "center",
			}}
		>
			{/* This makes expo-router use the `options` export from each file */}
			<Stack.Screen name="index" options={{ title: "Inicio" }} />
			<Stack.Screen name="instructions" options={{ title: "Instrucciones" }} />
			<Stack.Screen name="recording" options={{ title: "Grabación" }} />
			<Stack.Screen name="analyzing" options={{ title: "Analizando..." }} />
			<Stack.Screen name="result" options={{ title: "Resultados" }} />
		</Stack>
	);
}
