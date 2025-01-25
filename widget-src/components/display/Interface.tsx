// Dependencies
const { Frame } = figma.widget
// Components
import { Background, BottomBar, Header } from "@/components/ui"
import { WIDGET_MENU } from "@/constants"

/** Import Changelog
 * commented unnimported comps
 * added theme as const
 * add messages as children
 */

interface InterfaceProps extends ReqCompProps, OptionalRender, Partial<FrameProps> {
   viewport: number
}

/** Telegram Interface - Header, Chat Input + ios */
export function Interface({ children, viewport, renderElements, theme, ...props }: InterfaceProps) {
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
         width={WIDGET_MENU.dimensions[viewport].width}
         height={WIDGET_MENU.dimensions[viewport].height}
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
