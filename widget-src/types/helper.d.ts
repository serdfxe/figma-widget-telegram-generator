type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
/** all lowercase English letters (a to z). */
type LowerCaseLetter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"
/** all English letters (a to z & A to Z). */
type Letter = Uppercase<LowerCaseLetter> | LowerCaseLetter

type ColorHex = `#${string}`

type PrimitiveColor =
   | "white"
   | "black"
   | "red"
   | "green"
   | "blue"
   | "yellow"
   | "cyan"
   | "magenta"
   | "gray"
   | "grey"
   | "maroon"
   | "olive"
   | "lime"
   | "aqua"
   | "teal"
   | "navy"
   | "fuchsia"
   | "purple"
   | "silver"
   | "orange"
   | "brown"
   | "pink"
   | "gold"
   | "beige"
   | "coral"
   | "crimson"
   | "indigo"
   | "ivory"
   | "khaki"
   | "lavender"
   | "linen"
   | "plum"
   | "salmon"
   | "sienna"
   | "tan"
   | "turquoise"
   | "violet"
   | ""

/** A recursive utility type that concatenates T (in this case, Letter) until the length of Accumulated matches Count. */
// type Repeat<T extends string, Count extends number, Accumulated extends string = ""> = Strlen<Accumulated> extends Count ? Accumulated : Repeat<T, Count, `${Accumulated}${T}`>

// type Strlen<Str extends string, Cache extends string[] = []> = Str extends `${infer First}${infer Rest}`
//    ? Strlen<Rest, [...Cache, First]> // <-- The array is a type literal, no need for 'readonly' (see above)
//    : Cache["length"]
