export function mapSliderToAmount(sliderValue: number): number {
  const MIN = 10;
  const MAX = 500;
  return Math.round(MIN + (MAX - MIN) * (sliderValue / 100));
}

export function formatToKoreanMoney(amount: number): string {
  if (amount < 0) return "";

  const billion = Math.floor(amount / 100); // 억
  const million = amount % 100; // 백만원 단위

  let result = "";

  if (billion > 0) {
    result += `${billion}억원`;
  }

  if (million > 0) {
    if (million % 10 === 0) {
      result += `${million / 10}천만원`;
    } else {
      result += `${million}백만원`;
    }
  }

  if (result === "") {
    result = "0원";
  }

  return result;
}
