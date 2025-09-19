"use client";
import { RoomContext } from "@livekit/components-react";
import { useCallback, useState } from "react";
import SimpleVoiceAssistant from "./livekit/SimpleVoiceAssistant";
import { ConnectionDetails } from "@/app/api/token/route";
import { Room } from "livekit-client";
import ControlBar from "./livekit/ControlBar";

export default function Page() {
	const [room] = useState(new Room());

	const onConnectButtonClicked = useCallback(async () => {
		// Generate room connection details, including:
		//   - A random Room name
		//   - A random Participant name
		//   - An Access Token to permit the participant to join the room
		//   - The URL of the LiveKit server to connect to
		//
		// In real-world application, you would likely allow the user to specify their
		// own participant name, and possibly to choose from existing rooms to join.

		const url = new URL(
			process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ?? "/api/token",
			window.location.origin
		);
		const response = await fetch(url.toString());
		const connectionDetailsData: ConnectionDetails = await response.json();

		await room.connect(
			connectionDetailsData.serverUrl,
			connectionDetailsData.participantToken
		);
		await room.localParticipant.setMicrophoneEnabled(true);
	}, [room]);

	return (
		<main
			data-lk-theme="default"
			className="h-[100vh] flex items-center justify-center]"
		>
			<RoomContext.Provider value={room}>
				<div className="lk-room-container max-w-[1024px] w-full mx-auto max-h-[90vh]">
					<SimpleVoiceAssistant
						onConnectButtonClicked={onConnectButtonClicked}
					/>
					{/* <ControlBar onConnectButtonClicked={onConnectButtonClicked} /> */}
				</div>
			</RoomContext.Provider>
		</main>
	);
}
