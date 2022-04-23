import { withoutCharacters } from './without-characters';

export function isCPF(value: string): boolean {
  const valueWithoutCharacters = withoutCharacters(value);

  if (
    valueWithoutCharacters == '' ||
    valueWithoutCharacters.length != 11 ||
    valueWithoutCharacters ==
      valueWithoutCharacters.charAt(0).repeat(valueWithoutCharacters.length)
  )
    return false;

  const firstNineDigits = valueWithoutCharacters.slice(0, 9);
  const checkerDigit1 = createCheckerDigit(firstNineDigits);
  const checkerDigit2 = createCheckerDigit(firstNineDigits + checkerDigit1);

  const cpfGenerated = firstNineDigits + checkerDigit1 + checkerDigit2;

  return valueWithoutCharacters === cpfGenerated;
}

function createCheckerDigit(cpfPartial: string) {
  const cpfPartialOnlyWithNumbers = withoutCharacters(cpfPartial);
  const cpfArray = Array.from(cpfPartialOnlyWithNumbers).map((digit) =>
    Number(digit),
  );

  const sumDigitsCpf = cpfArray.reduce((total, digit, index, array) => {
    total += digit * (array.length + 1 - index);
    return total;
  }, 0);

  const rest = sumDigitsCpf % 11;
  const checkerDigit = 11 - rest;

  return checkerDigit > 9 ? '0' : checkerDigit.toString();
}
