/** Maps ThemedColorsMapParameter tokens object to a top level themed key object */
export const remapTokens = (input: ThemedColorsMapParameter): ThemedColors => {
   const output = {} as ThemedColors

   for (const layoutProp in input) {
      const layoutPropKey = layoutProp as keyof ThemedColorsMapParameter // Assert Key Type
      for (const token in input[layoutPropKey]) {
         const tokenKey = input[layoutPropKey]![token] // Assert Key Type
         for (const theme in tokenKey) {
            const themeKey = theme as ThemeModes // Assert Key Type

            // Initialize output Props
            output[themeKey] = output[themeKey] || {}
            output[themeKey][layoutPropKey] = output[themeKey][layoutPropKey] || {}

            output[themeKey][layoutPropKey]![token] = tokenKey[themeKey]
         }
      }
   }

   return output
}

// TODO: Assert output type
