// Dependencies
const { Frame } = figma.widget
// Components
import { Background, BottomBar, Header } from "@/components/ui"
import { DIMENSIONS, USERNAMES } from "@/constants"
import { useDynamicState } from "@/hooks"

/** Import Changelog
 * commented unnimported comps
 * added theme as const
 * add messages as children
 */

interface InterfaceProps extends ReqCompProps, OptionalRender, Partial<FrameProps> {
   viewport: number
   chatId: number
}

/** Telegram Interface - Header, Chat Input + ios */
export function Interface({ children, chatId, viewport, renderElements, theme, ...props }: InterfaceProps) {
   const [recipient, setRecipient] = useDynamicState({ username: USERNAMES[chatId] }) // Username / Image

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
         width={DIMENSIONS[viewport].width}
         height={DIMENSIONS[viewport].height}
         {...props}
      >
         <Background
            theme={theme}
            name="chat-bg/latest"
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
            onEvent={(e) => setRecipient("username", e.characters)}
            value={recipient.username}
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
