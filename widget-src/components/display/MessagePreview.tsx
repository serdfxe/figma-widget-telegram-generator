// Components
import { Message } from "@/components/ui"
import { DirectionContainer, PreviewLabel, WithButtons } from "@/components/display/atoms"

interface MessagePreviewProps extends Partial<AutoLayoutProps>, ReqCompProps {
   editorState: Message
}

/** Message from editor mode (preview labeled) */
export function MessagePreview({ theme, editorState, ...props }: MessagePreviewProps) {
   const { direction, type, text, name, size, extension, buttons } = editorState

   // Convert
   const directionAsStr = (["in", "out"] as const)[direction]
   const typeAsStr = (["image", "text"] as const)[type]

   // Match Overload
   const propsOfType = [
      {
         name,
         size,
         extension,
         text,
      },
   ]

   return (
      <DirectionContainer name="Preview Container" side={directionAsStr} {...props}>
         <WithButtons buttons={buttons} theme={theme}>
            <PreviewLabel theme={theme} />
            <Message side={directionAsStr} type={typeAsStr} config={propsOfType[0]} theme={theme} />
         </WithButtons>
      </DirectionContainer>
   )
}
