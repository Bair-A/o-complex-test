export function extractTextFromHtml(htmlString: string) {
  const h1Match = htmlString.match(/<h1>(.*?)<\/h1>/i);
  const title = h1Match ? h1Match[1] : '';

  const pMatch = htmlString.match(/<p>(.*?)<\/p>/i);
  const body = pMatch ? pMatch[1] : '';

  return {
    title,
    body,
  };
}

export function isPhoneValid(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 11;
}
