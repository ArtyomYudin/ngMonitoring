function streamCam() {
  const client = 'wss://it.center-inform.ru:9999';
  const canvas = document.getElementById('video-canvas');
  const player = new JSMpeg.Player(client, {
    canvas,
    audio: false,
  });
}

function streamCamRoom1() {
  const client = 'wss://it.center-inform.ru:9997';
  const canvas = document.getElementById('video-canvas1');
  const player = new JSMpeg.Player(client, {
    canvas,
    audio: false,
  });
}

function streamCamRoom2() {
  const client = 'wss://it.center-inform.ru:9998';
  const canvas = document.getElementById('video-canvas2');
  const player = new JSMpeg.Player(client, {
    canvas,
    audio: false,
  });
}
