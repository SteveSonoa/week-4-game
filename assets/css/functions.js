function loadAudio(name, file) {
	$("#audioStorage").append("<audio id='" + name + "'></audio>");
	if(file) {
		$("#" + name).append("<source src='assets/sfx/" + file + ".mp3' type='audio/mpeg'>");
	}
}