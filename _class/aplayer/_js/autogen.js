// www.web.com/test.html?path=./source/audio

function importInfo(url) {
  fetch(url)
	.then(response => response.text())
	.then(data => {
	  const info = data.split('\n').filter(line => line.trim() !== '');
	  const audioList = [];

	  info.forEach(name => {
		const audio = {
		  name: name.trim(),
		  url: `${path}/${name.trim()}.mp3`,
		  cover: `${path}/cover.jpg`
		};

		audioList.push(audio);
	  });

	  const ap = new APlayer({
		container: document.getElementById('aplayer'),
		audio: audioList
	  });
	})
	.catch(error => {
	  console.error('Error:', error);
	});
}

const queryParameters = new URLSearchParams(window.location.search);
const path = queryParameters.get('path');

if (path) {
  const infoUrl = `${path}/info.md`;
  importInfo(infoUrl);
}