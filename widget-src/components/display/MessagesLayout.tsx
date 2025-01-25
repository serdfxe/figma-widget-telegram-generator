// Dependencies
const { AutoLayout } = figma.widget
// Components
import { DirectionContainer, WithButtons } from "@/components/display/atoms"
import { Message } from "@/components/ui"
import { EDITOR_INPUTS } from "@/constants"

interface MessagesLayoutProps extends Partial<AutoLayoutProps>, ReqCompProps, OptionalRender {
   messages?: (Message[] | undefined)[]
}

/** A component that arranges messages in a specific layout (In & Out Messages). */
export function MessagesLayout({ messages, renderElements, children, theme, ...props }: MessagesLayoutProps) {
   /** Last Message Only Display Mode */
   const lastMessageSide = messages?.[messages.length - 1]
   const lastMessage = lastMessageSide?.[lastMessageSide.length - 1]

   return !renderElements ? (
      <>
         {lastMessage ? (
            <AutoLayout direction="vertical" spacing={28}>
               <WithButtons buttons={lastMessage.buttons} theme={theme}>
                  <Message
                     type={EDITOR_INPUTS.type.values[lastMessage.type]}
                     side={EDITOR_INPUTS.direction.values[lastMessage.direction]}
                     config={lastMessage}
                     theme={theme}
                  ></Message>
               </WithButtons>
               {children}
            </AutoLayout>
         ) : (
            children
         )}
      </>
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
         {messages?.map(
            (dirMsg, key) =>
               dirMsg && (
                  <DirectionContainer key={key} side={EDITOR_INPUTS.direction.values[dirMsg[0].direction]}>
                     {dirMsg.map((msg, key) => (
                        <WithButtons key={key} buttons={msg.buttons} theme={theme}>
                           <Message type={EDITOR_INPUTS.type.values[msg.type]} side={EDITOR_INPUTS.direction.values[msg.direction]} config={msg} theme={theme}></Message>
                        </WithButtons>
                     ))}
                  </DirectionContainer>
               ),
         )}
         {children}
      </AutoLayout>
   )
}
