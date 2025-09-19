import {
	useVoiceAssistant,
	RoomAudioRenderer,
} from "@livekit/components-react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import TranscriptionView from "../TranscriptionView";
import ControlBar from "./ControlBar";
import { NoAgentNotification } from "../NoAgentNotification";
import { Welcome } from "../Welcome";
import { ConnectingScreen } from "../ConnectingScreen";
import AgentVisualizer from "./AgentVisualizer";

const SimpleVoiceAssistant = (props: {
	onConnectButtonClicked: () => void;
}) => {
	const { state: agentState } = useVoiceAssistant();
	console.log("Agent state:", agentState);

	return (
		<>
			<AnimatePresence mode="wait">
				{agentState === "disconnected" ? (
					<Welcome
						disabled={false}
						startButtonText="Start Conversation"
						onConnectButtonClicked={props.onConnectButtonClicked}
					/>
				) : agentState === "connecting" ? (
					<ConnectingScreen />
				) : (
					<motion.div
						key="connected"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3, ease: [0.09, 1.04, 0.245, 1.055] }}
						className="flex flex-col items-center gap-4 h-full"
					>
						<AgentVisualizer />
						<div className="flex-1 w-full">
							<TranscriptionView />
						</div>
						<div className="w-full">
							<ControlBar
								onConnectButtonClicked={props.onConnectButtonClicked}
							/>
						</div>
						<RoomAudioRenderer />
						<NoAgentNotification state={agentState} />
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default SimpleVoiceAssistant;
