export function readFileContent(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (!file) {
      resolve('');
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = reader.result.toString();
      resolve(text);
    };
    return reader.readAsText(file);
  });
}
