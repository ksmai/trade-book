function generateID() {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const suffix = Array(16)
    .fill()
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');

  return `${timestamp}${suffix}`.toLowerCase();
}

console.log(generateID());

