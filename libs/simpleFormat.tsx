export default function simpleFormat(str: string): string {
  // Not sure why we're replacing \r when it doesn't seem to appear in data.json
  str = str.replace(/\r\n?/, "\n");
  str = str.trim();
  if (str.length > 0) {
    str = str.replace(/\n\n+/g, '</p><p>');
    str = str.replace(/\n/g, '<br />');
    str = '<p>' + str + '</p>';
  }
  return str;
}
