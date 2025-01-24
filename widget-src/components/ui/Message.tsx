// Dependencies
const { Image, AutoLayout, Text } = figma.widget
// Components
import { PreviewImage64 } from "@/assets/base64"
import { remapTokens } from "@/utils"
import { EDITOR_INPUTS } from "@/constants"
// Internal
import { StatusAtom, TailAtom } from "@/components/ui/atoms"

/* Import Changelog
 * Added maxWidth at maxMin Layer
 * Images to base64 (full src (data:im...))
 * Props Drilling (ReqCompProps const) for Atom comps
 * Add color object (surface) (handle theme mode with remapTokens() from utils & side prop)
 * Extracted Radius for each side into an object
 * Overload case for MessageProps
 */

type MessageTypes<S extends number = number> = (typeof EDITOR_INPUTS)["type"]["values"][S]
export type MessageSides = (typeof EDITOR_INPUTS)["direction"]["values"][number]

interface TypePropsMap {
   required: {
      side: MessageSides
      type: MessageTypes
   }
   text: {
      // children: string // valid alt
      config: {
         text: string
      }
   }
   image: {
      config: {
         /** File Name*/
         name: string
         /** File Size 2.4 MB */
         size: string
         /** File Size .PNG*/
         extension?: string
      }
   }
   file: {
      config: {
         src?: ""
      }
   }
}

type MessageProps<T extends MessageTypes> = TypePropsMap[Lowercase<T>] & TypePropsMap["required"] & ReqCompProps & Partial<AutoLayoutProps>

// Overloaded function signatures
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Message(props: MessageProps<MessageTypes<0>>): any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Message(props: MessageProps<MessageTypes<1>>): any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Message(props: MessageProps<MessageTypes<2>>): any

export function Message<T extends MessageTypes>({ side, type, config, theme, ...props }: MessageProps<T>) {
   /** Required by children (Drilled Props) */
   const reqChildProps = { side, type, theme }

   // Theme Mode
   const color = remapTokens({
      surface: {
         containerIn: { dark: "#262628", light: "#FFF" },
         containerOut: { dark: "#363638", light: "#E1FEC6" },
      },
      text: {
         primaryIn: { dark: "#FFF", light: "#000" },
         primaryOut: { dark: "#FFF", light: "#000" },
         labelIn: { dark: "#8D8D8F", light: "#8D8D8F" },
         labelOut: { dark: "#8D8D8F", light: "#3EAA3C" },
      },
   })[theme]

   const layout = {
      tailX: {
         sideIn: "left",
         sideOut: "right",
      },
      radius: {
         In: { topLeft: 12, topRight: 18, bottomRight: 16, bottomLeft: 16 },
         Out: { topLeft: 18, topRight: 12, bottomRight: 16, bottomLeft: 18 },
      },
   } as const

   const textConfig = config as MessageProps<"Text">["config"]

   return (
      <AutoLayout
         name={`Message${side + type}`}
         effect={{
            type: "drop-shadow",
            color: "#00000040",
            offset: {
               x: 0,
               y: 4,
            },
            blur: 22.6,
            showShadowBehindNode: false,
         }}
         overflow="visible"
         verticalAlignItems="end"
         {...props}
      >
         <TailAtom
            {...reqChildProps}
            name="_tail-atom"
            x={{
               type: layout.tailX[`side${side}`],
               offset: -6.077,
            }}
            y={{
               type: "bottom",
               offset: -1,
            }}
            positioning="absolute"
         />
         <AutoLayout
            name="text box"
            fill={color.surface[`container${side}`]}
            direction="vertical"
            cornerRadius={layout.radius[side]}
            spacing={6}
            padding={{
               vertical: 8,
               horizontal: type === "File" ? 8 : 14,
            }}
         >
            {type !== "File" ? (
               type !== "Text" ? (
                  <>
                     <AutoLayout
                        name="Content Image"
                        minHeight={!textConfig.text ? 150 : 135}
                        minWidth={!textConfig.text ? 250 : 118}
                        overflow="visible"
                        direction="vertical"
                        spacing={8}
                        width="fill-parent"
                     >
                        <Image
                           name="Rectangle 1"
                           x={{
                              type: "left-right",
                              leftOffset: -13,
                              rightOffset: -13,
                           }}
                           y={{
                              type: "top-bottom",
                              topOffset: -7,
                              bottomOffset: !textConfig.text ? -7 : 0,
                           }}
                           positioning="absolute"
                           cornerRadius={{
                              topLeft: layout.radius[side].topLeft - 1,
                              topRight: layout.radius[side].topRight - 1,
                              bottomRight: !textConfig.text ? layout.radius[side].bottomRight - 1 : 0,
                              bottomLeft: !textConfig.text ? layout.radius[side].bottomLeft - 1 : 0,
                           }}
                           width={276}
                           height={142}
                           src={PreviewImage64}
                        />
                     </AutoLayout>
                     <AutoLayout name="Content Text" hidden={!textConfig.text} maxWidth={250} overflow="visible" spacing={8}>
                        <Text
                           name="Text"
                           fill={color.text[`primary${side}`]}
                           width="fill-parent"
                           lineHeight={22}
                           fontSize={15}
                           letterSpacing={-0.4}
                           strokeWidth={0}
                           strokeAlign="center"
                        >
                           {textConfig.text + "                "}
                        </Text>
                     </AutoLayout>
                  </>
               ) : (
                  <>
                     {/* Text */}
                     <AutoLayout name="Content Text" minWidth={60} maxWidth={250} overflow="visible" spacing={8}>
                        <Text
                           name="Text"
                           fill={color.text[`primary${side}`]}
                           width="fill-parent"
                           lineHeight={22}
                           fontSize={15}
                           letterSpacing={-0.4}
                           strokeWidth={0}
                           strokeAlign="center"
                        >
                           {(config as MessageProps<"Text">["config"]).text + "                "}
                        </Text>
                     </AutoLayout>
                  </>
               )
            ) : (
               <>
                  {/* File */}
                  <AutoLayout name="Conent File" minWidth={100} overflow="visible" spacing={8} verticalAlignItems="center">
                     <Image name="Preview" cornerRadius={11} strokeWidth={0} strokeAlign="center" width={74} height={74} src={PreviewImage64} />
                     <AutoLayout
                        name="Stats"
                        overflow="visible"
                        direction="vertical"
                        padding={{
                           vertical: 0,
                           horizontal: 8,
                        }}
                     >
                        <AutoLayout name="Frame 3" overflow="visible" width="fill-parent">
                           <Text name="IMG_0475.PNG" fill={color.text[`primary${side}`]} lineHeight={21} letterSpacing={-0.3} strokeWidth={0} strokeAlign="center">
                              {(config as MessageProps<"Image">["config"]).name}
                           </Text>
                           <Text name="IMG_0475.PNG" fill={color.text[`primary${side}`]} lineHeight={21} letterSpacing={-0.3} strokeWidth={0} strokeAlign="center">
                              {(config as MessageProps<"Image">["config"]).extension}
                           </Text>
                        </AutoLayout>
                        <AutoLayout name="Frame 2" overflow="visible" width={43}>
                           <Text name="2.4 MB" fill={color.text[`label${side}`]} fontSize={13} letterSpacing={-0.1} strokeWidth={0} strokeAlign="center">
                              {(config as MessageProps<"Image">["config"]).size}
                           </Text>
                           <Text name="Label" fill={color.text[`label${side}`]} fontSize={13} letterSpacing={-0.1} strokeWidth={0} strokeAlign="center">
                              {"  "}
                              MB
                           </Text>
                        </AutoLayout>
                     </AutoLayout>
                  </AutoLayout>
               </>
            )}
         </AutoLayout>
         <StatusAtom
            {...reqChildProps}
            name="_status-atom"
            x={{
               type: "right",
               offset: 12,
            }}
            y={{
               type: "bottom",
               offset: 4,
            }}
            positioning="absolute"
            width={43}
         />
      </AutoLayout>
   )
}
