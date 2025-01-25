/* This is a Telegram bot chat generator. */
// Dependencies
const { widget } = figma
const { AutoLayout } = widget
// Components
import { useWidgetMenu, useDynamicState } from "@/hooks"
import { PhoneFrame, Interface, MessagesLayout, MessagePreview } from "@/components/display"
import { MessageBuilder } from "@/components/edit-mode"
import { REPLIES, CHATS } from "@/constants"

function Widget() {
   const { chatId, displayMode, viewport, theme, isEditMode } = useWidgetMenu() // Widget Property Menu

   // State Management (Constrained to chatId)
   const [chatState, setChatState] = useDynamicState<ChatState>({ messages: CHATS[chatId] }) // Chat Messages
   const [editorState, setEditorState] = useDynamicState<EditorState>({ ...REPLIES[chatId], isNew: true, hidePreview: false }) // Message Creator

   const showPreview = isEditMode && editorState.isNew && !editorState.hidePreview // Show Preview Condition

   return (
      <AutoLayout name="Widget Container" width={"hug-contents"} height={"hug-contents"} overflow="visible">
         {/* Generated Chat (Displayed Result) */}
         <PhoneFrame renderElements={displayMode <= 0} theme={theme}>
            <Interface renderElements={displayMode <= 1} viewport={viewport} theme={theme}>
               <MessagesLayout renderElements={displayMode <= 2} messages={chatState.messages} theme={theme}>
                  {/* Preview Message */}
                  {showPreview && <MessagePreview editorState={editorState} theme={theme} />}
               </MessagesLayout>
            </Interface>
         </PhoneFrame>

         {/*  */}

         {/* Editor Mode (New Message Constructor) */}
         <MessageBuilder renderElement={isEditMode} editorManager={[editorState, setEditorState, setChatState]} theme={theme} />
         {/* TODO: Remove existing messages from display (method) */}
      </AutoLayout>
   )
}

widget.register(Widget)
