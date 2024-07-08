// function solution(str, ending) {
//   const a = str.length - ending.length
//   for (let i = 0; i < ending.length; i++) {
//     if (str[i + a] !== ending[i]) {
//       return 'false'
//     }
//   }
//   return 'true'
// }
// console.log(solution('abcde', 'cde'))

// function descendingOrder(n) {
//   let str = ''
//   String(n)
//     .split('')
//     .sort((a, b) => b - a)
//     .map((i) => {
//       str += i
//     })
//   return Number(str)
// }

// console.log(descendingOrder(123456))

// const decodeMorse = function (morseCode) {
//   let outPut = ''
//   const MORSE_CODE = {
//     '-----': '0',
//     '.----': '1',
//     '..---': '2',
//     '...--': '3',
//     '....-': '4',
//     '.....': '5',
//     '-....': '6',
//     '--...': '7',
//     '---..': '8',
//     '----.': '9',
//     '.-': 'A',
//     '-...': 'B',
//     '-.-.': 'C',
//     '-..': 'D',
//     '.': 'E',
//     '..-.': 'F',
//     '--.': 'G',
//     '....': 'H',
//     '..': 'I',
//     '.---': 'J',
//     '-.-': 'K',
//     '.-..': 'L',
//     '--': 'M',
//     '-.': 'N',
//     '---': 'O',
//     '.--.': 'P',
//     '--.-': 'Q',
//     '.-.': 'R',
//     '...': 'S',
//     '-': 'T',
//     '..-': 'U',
//     '...-': 'V',
//     '.--': 'W',
//     '-..-': 'X',
//     '-.--': 'Y',
//     '--..': 'Z',
//     '-.-.--': '!',
//     '.-.-.-': '.',
//     '--..--': ',',
//   }
//   for (var i = 0; i < morseCode.split(' ').length; i++) {
//     if (i === '   ') {
//       outPut += ' '
//     } else {
//       outPut += MORSE_CODE[morseCode.split(' ')[i]]
//     }
//   }
//   return outPut.replace('undefinedundefined', ' ')
// }

// console.log(decodeMorse('.... . -.--   .--- ..- -.. .'))

// const str = 'Hello world'
// const str2 = str
//   .split('')
//   .map((l) => {
//     return l.repeat(2)
//   })
//   .join('')
// console.log(str2)

// const friends = ['Ryan', 'Kieran', 'Mark']

// const shouldBe = friends.filter((i) => {
//   if (i.length === 4) return i
// })
// console.log(shouldBe)

const str = 'Welcome'
const str2 = str
  .split(' ')
  .map((i) => (i.length >= 5 ? i.split('').reverse().join('') : i))
  .join(' ')
console.log(str2)
console.log(str2.length)
