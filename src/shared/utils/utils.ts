const shortenTitle = (text) => {
  return text.split(' ').slice(0, 3).join(' ');
};

const makeSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '') // حذف کاراکترهای خاص (برای فارسی هم اوکیه)
    .trim()
    .replace(/\s+/g, '-'); // فاصله‌ها رو با خط تیره عوض کن
};

export { shortenTitle, makeSlug };
