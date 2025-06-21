import "./camera.css";
import { useCallback, useEffect, useRef, useState } from "react";

const img2blob = (photo: HTMLImageElement) => {
	// Assuming photo is an HTMLImageElement
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

	canvas.width = photo.width;
	canvas.height = photo.height;

	ctx.drawImage(photo, 0, 0);
	return new Promise<Blob | null>((resolve, reject) => {
		canvas.toBlob((blob: Blob | null) => {
			if (!blob) reject();

			resolve(blob);
		}, "image/png");
	});
};

function Camera() {
	const [facingMode, setFacingMode] = useState<"environment" | "user">("user");
	const [filter, setFilter] = useState<string>("");
	const [image, setImage] = useState<string>("");
	const [downloadHref, setDownloadHref] = useState<string | null>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const loaderRef = useRef<HTMLDivElement>(null);

	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({
				video: {
					facingMode,
				},
				audio: false,
			})
			.then((stream) => {
				const video = videoRef.current;
				if (!video) return;

				video.srcObject = stream;
			})
			.catch(alert);
	}, [facingMode]);

	const clearPic = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const context = canvas.getContext("2d") as CanvasRenderingContext2D;
		context.fillStyle = "#AAA";
		context.fillRect(0, 0, canvas.width, canvas.height);

		const data = canvas.toDataURL("image/png");
		setImage(data);
	}, []);

	const takePic = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const [height, width] = [window.innerHeight, window.innerHeight];

		const context = canvas.getContext("2d") as CanvasRenderingContext2D;

		if (width && height) {
			canvas.width = width;
			canvas.height = height;

			if (!videoRef.current) return;
			context.drawImage(videoRef.current, 0, 0, width, height);

			context.filter = filter;
			const data = canvas.toDataURL("image/png");
			setImage(data);
		} else clearPic();
	}, [clearPic, filter]);

	return (
		<div
			onKeyUp={() => false}
			onClick={(e) => {
				if (!canvasRef.current) return;
				if (e.target !== canvasRef.current)
					Object.assign(canvasRef.current.style, {
						position: "absolute",
						bottom: "10px",
						left: "10px",
						border: "2px solid white",
						height: "40px",
						width: "40px",
					});
			}}
		>
			{/* Video Stram */}
			<video
				autoPlay
				ref={videoRef}
				style={{ filter }}
				onCanPlay={() => loaderRef.current?.classList.replace("show", "hide")}
			></video>

			{/* Capture buttons */}
			<div className="nav">
				<div id="shoot" onKeyUp={() => false} onClick={takePic}></div>

				<div hidden>
					<a
						download
						href={downloadHref ?? undefined}
						onKeyUp={() => false}
						onClick={async () => {
							const _img = new Image();
							_img.src = image;
							const photoBlob = await img2blob(_img);

							if (!photoBlob)
								return new Error("Failed to convert photo to blob");

							setDownloadHref(URL.createObjectURL(new Blob([photoBlob])));
						}}
					>
						<button type="button" id="download">
							Download
						</button>
					</a>
					<a href={image} target="_blank" onKeyUp={() => false}>
						<button type="button" id="preview">
							Preview
						</button>
					</a>
				</div>

				<input
					type="range"
					min="0.5"
					max="2"
					step="0.01"
					defaultValue="1"
					id="bright"
					onKeyUp={() => false}
					onClick={(e) => {
						setFilter(`brightness(${e.currentTarget.value})`);
					}}
				/>

				<button
					type="button"
					id="reverse"
					onKeyUp={() => false}
					onClick={() =>
						setFacingMode((s) => (s === "user" ? "environment" : "user"))
					}
				>
					Reverse
				</button>
			</div>

			{/* Image download */}
			<canvas
				ref={canvasRef}
				style={{ filter }}
				onKeyUp={() => false}
				onClick={(e) => {
					Object.assign(e.currentTarget.style, {
						transition: "0.5s",
						height: `${1.25 * (videoRef.current?.videoHeight ?? 0)}px`,
						width: `${1.25 * (videoRef.current?.videoWidth ?? 0)}px`,
						position: "absolute",
						bottom: "10%",
						left: "10%",
					});
				}}
			></canvas>

			<div className="output" hidden>
				<img
					id="photo"
					alt="The screen capture will appear in this box."
					width="212px"
					height="161px"
					style={{ filter }}
					src={image}
				/>
			</div>
		</div>
	);
}

export default Camera;
