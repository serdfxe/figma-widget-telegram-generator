import { THEME_MODES, EDITOR_INPUTS } from "@/constants"

declare global {
   /** Message Props*/
   type Message = {
      /** Messagge direction (side) recipient.. */
      dir: IndexesOf<typeof EDITOR_INPUTS.dir.map>
      type: IndexesOf<typeof EDITOR_INPUTS.type.map>
      text: string
      name: string
      size: string
      extension: string
      isImg: boolean
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
         [key in LayoutProps]?: {
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

   /** If A exists Return B else C  */
   type ifGen<A, B, C> = [A] extends [undefined | never] ? C : B

   /** Component Props contains event
    * Generic `P`: onEvent callback parameters (support array of arguments passed to callback)
    */
   interface ContainsEvent<P extends unknown[] = [WidgetClickEvent], V = never> {
      /** TextEditEvent Inputs Value */
      value: ifGen<V, V, P[0] extends WidgetClickEvent ? number : string>
      /** example User Click Event */
      onEvent: (...args: P) => void
   }

   /** Indexes of an array ["a", "b", "c"] => 0 | 1 | 2*/
   type IndexesOf<A extends unknown[], R = []> = R["length"] extends A["length"] ? R[number] : IndexesOf<A, [...R, R["length"]]>
}
