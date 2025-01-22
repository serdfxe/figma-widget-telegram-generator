const { widget } = figma
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { useSyncedState, usePropertyMenu, Rectangle, Frame, Image, AutoLayout, Text, Input, SVG } = widget

import { LatestDark64, LatestLight64, FlatDark64, FlatLight64 } from "../../assets/base64/Background"

/** Import Changelog
 * Darkmode handle with prop
 * modemask for theme with hidden (mask not available)
 * merged flat and latest
 */

interface ChatBgProps extends ReqCompProps, Partial<FrameProps> {
   type?: "flat" | "latest"
}

export function ChatBg({ theme, type = "latest", ...props }: ChatBgProps) {
   return (
      <Frame name="ChatBgLatest" width={225} height={626} {...props}>
         <Image
            name="last-light"
            x={{
               type: "left-right",
               leftOffset: 0,
               rightOffset: 0,
            }}
            y={{
               type: "top-bottom",
               topOffset: -10,
               bottomOffset: -10,
            }}
            width={225}
            height={646}
            src={type === "latest" ? LatestLight64 : FlatLight64}
         />
         <Frame
            name="dark mode only"
            hidden={theme !== "dark"}
            x={{
               type: "left-right",
               leftOffset: 0,
               rightOffset: 0,
            }}
            y={{
               type: "top-bottom",
               topOffset: 0,
               bottomOffset: -5,
            }}
            strokeWidth={0}
            overflow="visible"
            width={225}
            height={631}
         >
            <Rectangle
               name="mode mask"
               x={{
                  type: "left-right",
                  leftOffset: 0,
                  rightOffset: 0,
               }}
               y={{
                  type: "top-bottom",
                  topOffset: 0,
                  bottomOffset: 0,
               }}
               fill={{
                  opacity: 0,
                  type: "solid",
                  color: {
                     r: 1,
                     g: 1,
                     b: 1,
                     a: 1,
                  },
               }}
               width={225}
               height={631}
            />
            <Image
               name="last-dark"
               x={{
                  type: "left-right",
                  leftOffset: 0,
                  rightOffset: 0,
               }}
               y={{
                  type: "top-bottom",
                  topOffset: -21.168,
                  bottomOffset: -22.176,
               }}
               width={225}
               height={674.343}
               src={type === "latest" ? LatestDark64 : FlatDark64}
            />
         </Frame>
      </Frame>
   )
}
