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
  let cursor = 0;

  return new Promise((resolve, reject) => {
    for (let i = 0; i < PNG_SIGNATURE.length; i++) {
      if (PNG_SIGNATURE[i] != bytes[i]) {
        reject(new Error('Not a PNG file (invalid file signature)'));
        return;
      }
    }
    cursor += 8;

    const chunkLength = read4bytes(bytes);
    cursor += 4;

    const charCodes = [0, 1, 2, 3].map((i) => {
      return bytes[cursor + i];
    });
    cursor += 4;
    const chunkType = String.fromCharCode.apply(null, charCodes);
    console.log(chunkType);
    const posterDataHeader;

    switch (chunkType) {
      case 'IHDR':
        posterDataBytes = bytes.subarray(cursor + 8, cursor + 8 + chunkLength);
    }

    resolve();
  });
};

const read4bytes = (bytes, offset) => {
  return ((bytes[offset] << 24) |
    (bytes[offset+1] << 16) |
    (bytes[offset+2] << 8) |
    bytes[offset+3]) >>> 0;
};
const readByte = (bytes, offset) => {
  return bytes[offset] >>> 0;
};

window.APNG = {
  parseByUrl: parseByUrl
};
