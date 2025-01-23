// Dependencies
const { Image, AutoLayout, Text } = figma.widget
// Components
import { StatusAtom, TailAtom } from "@/components/atoms"
import { PreviewImage64 } from "@/assets/base64"
import { remapTokens } from "@/utils"

/** Import Changelog
 * Added maxWidth at maxMin Layer
 * Images to base64 (full src (data:im...))
 * Props Drilling (ReqCompProps const) for Atom comps
 * Add color object (surface) (handle theme mode with remapTokens() from utils & side prop)
 * Extracted Radius for each side into an object
 * Overload case for MessageProps
 */

type MessageTypes = "text" | "image"

interface TypePropsMap {
   required: {
      side: "in" | "out"
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
         fileName: string
         fileSize: string
         fileExtension?: string
      }
   }
}

type MessageProps<T extends MessageTypes> = TypePropsMap[T] & TypePropsMap["required"] & ReqCompProps & Partial<AutoLayoutProps>

// Overloaded function signatures
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Message(props: MessageProps<"text">): any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Message(props: MessageProps<"image">): any

export function Message<T extends MessageTypes>({ side, type, config, theme, ...props }: MessageProps<T>) {
   /** Required by children (Drilled Props) */
   const reqChildProps = { side, type, theme }

   // Theme Mode
   const color = remapTokens({
      surface: {
         in: { dark: "#262628", light: "#FFF" },
         out: { dark: "#363638", light: "#E1FEC6" },
      },
      text: {
         in: { dark: "#FFF", light: "#000" },
         out: { dark: "#FFF", light: "#000" },
      },
   })[theme]

   const layout = {
      tailXType: {
         in: "left",
         out: "right",
      },
      radius: {
         in: { topLeft: 12, topRight: 18, bottomRight: 16, bottomLeft: 16 },
         out: { topLeft: 18, topRight: 12, bottomRight: 16, bottomLeft: 18 },
      },
   } as const

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
         <AutoLayout
            name="text box"
            fill={color.surface[side]}
            cornerRadius={layout.radius[side]}
            padding={{
               vertical: 8,
               horizontal: 14,
            }}
         >
            {type === "image" ? (
               <>
                  <AutoLayout name="Frame 2" overflow="visible" spacing={8} verticalAlignItems="center">
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
                           <Text name="IMG_0475.PNG" fill={color.text[side]} lineHeight={21} letterSpacing={-0.3} strokeWidth={0} strokeAlign="center">
                              {(config as MessageProps<"image">["config"]).fileName}
                           </Text>
                           <Text name="IMG_0475.PNG" fill={color.text[side]} lineHeight={21} letterSpacing={-0.3} strokeWidth={0} strokeAlign="center">
                              {(config as MessageProps<"image">["config"]).fileExtension}
                           </Text>
                        </AutoLayout>
                        <AutoLayout name="Frame 2" overflow="visible" width={43}>
                           <Text name="2.4 MB" fill={color.text[side]} fontSize={13} letterSpacing={-0.1} strokeWidth={0} strokeAlign="center">
                              {(config as MessageProps<"image">["config"]).fileSize}
                           </Text>
                           <Text name="Label" fill={color.text[side]} fontSize={13} letterSpacing={-0.1} strokeWidth={0} strokeAlign="center">
                              {"  "}
                              MB
                           </Text>
                        </AutoLayout>
                     </AutoLayout>
                  </AutoLayout>
               </>
            ) : (
               <>
                  <AutoLayout name="maxMin" maxWidth={250} overflow="visible" spacing={8}>
                     <Text name="message" fill={color.text[side]} width="fill-parent" lineHeight={22} fontSize={15} letterSpacing={-0.4} strokeWidth={0} strokeAlign="center">
                        {/* Hey, how's it going? Are we still on for dinner tonight? Let me know what time works for you */}
                        {(config as MessageProps<"text">["config"]).text + "                "}
                     </Text>
                  </AutoLayout>
               </>
            )}
         </AutoLayout>
         <TailAtom
            {...reqChildProps}
            name="_tail-atom"
            x={{
               type: layout.tailXType[side],
               offset: -6.077,
            }}
            y={{
               type: "bottom",
               offset: -1,
            }}
            positioning="absolute"
         />
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
