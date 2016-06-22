const load = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        reject(this);
      }
    };
    xhr.send();
  });
};

const parseByUrl = (url) => {
  return load(url).then(parseAPNG);
};

const parseAPNG = (buffer) => {
  let bytes = new Uint8Array(buffer);
  const PNG_SIGNATURE = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  return new Promise((resolve, reject) => {
    for (let i = 0; i < PNG_SIGNATURE.length; i++) {
      if (PNG_SIGNATURE[i] != bytes[i]) {
        reject(new Error('Not a PNG file (invalid file signature)'));
        return;
      }
    }
    resolve();
  });
};

window.APNG = {
  parseByUrl: parseByUrl
};
