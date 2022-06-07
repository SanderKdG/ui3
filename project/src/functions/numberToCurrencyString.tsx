export default function numberToCurrencyString(number : number) {
  return "€ "+(new Intl.NumberFormat().format(number).replaceAll(",","."))
}