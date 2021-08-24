
function createFile(value){
	const fileType = value.split(".").pop();
	let file;

	if (fileType === "mp3"){
		file = document.createElement("audio");
		file.controls = true;
		const source = document.createElement("source");
		source.src = value;
		source.type = "audio/mpeg";
		file.className = "audio";
		file.append(source);
	}else if(fileType === "mp4"){
		file = document.createElement("video");
		file.controls = true;
		const source = document.createElement("source");
		source.src = value;
		source.type = "video/mp4";
		file.className = "video";
		file.append(source);
	}
	else {
		file= document.createElement("img");
		file.src = value;
		file.className = "pic";
	}

	return {file};
}

function createBox(value){
	const {file} = createFile(value);
	const divFile = document.createElement("div");
	divFile.className = `divFile div_${file.className}`;
	const headText = document.createElement("p");
	headText.className = "headText";
	headText.textContent = value.split("/").pop();

	divFile.append(file);
	divFile.append(headText);

	return divFile;
}



export function filesRender(arrayS) {
	const app =document.getElementById("app");
	const divBox = document.createElement("div");
	divBox.className = "divBox";

	arrayS.map(value => {
		divBox.append(createBox(value));
	});

	app.append(divBox);
}
