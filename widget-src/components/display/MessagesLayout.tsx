// Dependencies
const { AutoLayout } = figma.widget

import { DirectionContainer, WithButtons } from "@/components/display/atoms"
import { Message } from "../ui"

interface MessagesLayoutProps extends Partial<AutoLayoutProps>, ReqCompProps, OptionalRender {
   messagesState: MessagesState
}

/** A component that arranges messages in a specific layout (In & Out Messages). */
export function MessagesLayout({ messagesState, renderElements, children, theme, ...props }: MessagesLayoutProps) {
   return !renderElements ? (
      children // TODO: last message
   ) : (
      <AutoLayout
         name="Container Layout" // Container
         x={{
            type: "left-right",
            leftOffset: 0,
            rightOffset: 0,
         }}
         y={{
            type: "bottom",
            offset: 0,
         }}
         overflow="visible"
         direction="vertical"
         spacing={24}
         padding={{
            vertical: 16,
            horizontal: 8,
         }}
         width={390}
         verticalAlignItems="end"
         horizontalAlignItems="center"
         {...props}
      >
         {messagesState.messages?.map(
            (dirMsg) =>
               dirMsg && (
                  <DirectionContainer side={(["out", "in"] as const)[dirMsg[0].direction]}>
                     {dirMsg.map((msg) => (
                        <WithButtons buttons={msg.buttons} theme={theme}>
                           <Message type={(["image", "text"] as const)[msg.type]} side={(["out", "in"] as const)[msg.direction]} config={msg} theme={theme}></Message>
                        </WithButtons>
                     ))}
                  </DirectionContainer>
               ),
         )}
         {children}
      </AutoLayout>
   )
}
