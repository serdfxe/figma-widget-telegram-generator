import { THEME_MODES } from "@/constants"

declare global {
   /** Message Props*/
   type Message = {
      direction: number
      type: number
      text: string
      name: string
      size: string
      extension: string
      buttons: {
         id: number
         text: string
         hasRef: boolean
      }[][]
   }

   /** Messages
    * @description 2D Array of Out & In Messages
    */
   type ChatState = {
      /** Array of previous messages presetted [bot, friends, none] */
      // chats: (Message[] | undefined)[][]
      messages?: (Message[] | undefined)[]
   }

   /** @param `hidePreview` - Editor Preference, hides preview from chat  */
   type EditorState = Message & { hidePreview: boolean }

   // Components

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

   // Utils

   /** Hex & Primitives */
   type Color = ColorHex | PrimitiveColor | (WidgetJSX.SolidPaint | WidgetJSX.GradientPaint)[]

   type ThemeModes = (typeof THEME_MODES)[number]

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
