function randomValueHex(len) {
  const characters = "0123456789ABCDEF";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default function RandomID() {
  return randomValueHex(6);
}
