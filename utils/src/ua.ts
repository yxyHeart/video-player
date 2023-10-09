export function parseUA(userAgent: string) {
    return {
      isIE: /MSIE|Trident/i.test(userAgent),
      isMobile: /iPhone|iPad|iPod|Android/i.test(userAgent),
      isAndroid: /(android)/i.test(userAgent),
      isSafari: /^((?!chrome|android).)*safari/i.test(userAgent),
    }
  }
  
  export default parseUA(
    // TODO: 加一个 context 让各处访问更好
    typeof navigator !== 'undefined' ? navigator.userAgent : ''
  )