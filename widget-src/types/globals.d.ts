import { themeModes } from "../constants"

declare global {
   /** Display Modes */
   interface OptionalRender {
      /** Applies to all Elements except children
       *
       * When false: Renders Children only (Elements wont be present in tree)
       * otherwise use isVisible or hidden
       *  */
      renderElements: boolean
      /** Children always visible (shows In tree) */
      isVisible?: boolean
   }

   /** Component Props (Required) */
   interface ReqCompProps {
      /** Theme Mode, Set Color Variables */
      theme: ThemeModes
   }

   /** Hex & Primitives */
   type Color = ColorHex | PrimitiveColor

   type ThemeModes = (typeof themeModes)[number]

   type LayoutProps = "surface" | "text" | "stroke" | "effects"

   /** Constant per Component with theme mode variables */
   type ThemedColorsMapParameter = {
      [key in LayoutProps]?: {
         [key: string]: { [key in ThemeModes]: Color }
      }
   }

   type ThemedColors = {
      [key in ThemeModes]: {
         [key in LayoutProps]: {
            [key: string]: Color
         }
      }
   }

   /**
    * Make Picked properties in T optional
    */
   type PartialPick<T, K extends keyof T> = Omit<T, K> & {
      [P in K]?: T[P]
   }
}
