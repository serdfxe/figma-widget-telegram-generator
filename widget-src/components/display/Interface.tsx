const { widget } = figma
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Frame } = widget

import { ChatBg } from "../ui/ChatBg"
import { Header } from "../ui/Header"
import { BottomBar } from "../ui/BottomBar"

/** Import Changelog
 * commented unnimported comps
 * added theme as const
 * add messages as children
 */

interface InterfaceProps extends ReqCompProps, OptionalRender, Partial<FrameProps> {}

/** Telegram Interface - Header, Chat Input + ios */
export function Interface({ children, renderElements, theme, ...props }: InterfaceProps) {
   return !renderElements ? (
      children
   ) : (
      <Frame
         name="Interface"
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
         fill="#151515"
         width={390 + 19 * 2}
         height={844 + 16 * 2}
         {...props}
      >
         <ChatBg
            theme={theme}
            name="chat-bg/latest"
            x={{
               type: "left-right",
               leftOffset: -1,
               rightOffset: 0,
            }}
            y={{
               type: "top-bottom",
               topOffset: 89,
               bottomOffset: 80,
            }}
            width={390}
            height={675}
         />
         <BottomBar
            theme={theme}
            name="ChatInput"
            x={{
               type: "left-right",
               leftOffset: 0,
               rightOffset: 0,
            }}
            y={{
               type: "bottom",
               offset: 0,
            }}
            width={390}
         />
         <Frame
            name="Viewport Overflow Track"
            overflow="scroll"
            x={{
               type: "left-right",
               leftOffset: 0,
               rightOffset: 0,
            }}
            y={{
               type: "top-bottom",
               topOffset: 89,
               bottomOffset: 80,
            }}
            width={390}
            height={675}
         >
            {children}
         </Frame>
         <Header
            theme={theme}
            name="Header"
            x={{
               type: "left-right",
               leftOffset: 0,
               rightOffset: 0,
            }}
            width={390}
         />
      </Frame>
   )
}
