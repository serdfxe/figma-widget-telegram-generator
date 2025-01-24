/* This is a Telegram bot chat generator. */
// Dependencies
const { widget } = figma
const { AutoLayout } = widget
// Components
import { useWidgetMenu, useDynamicState } from "@/hooks"
import { PhoneFrame, Interface, MessagesLayout, MessagePreview } from "@/components/display"
import { MessageBuilder } from "@/components/edit-mode"
import { EDITOR_STATE } from "./constants"

function Widget() {
   const { theme, displayMode, isEditMode } = useWidgetMenu() // Widget Property Menu

   // State Management
   const [editorState, setEditorState] = useDynamicState<EditorState>({ ...EDITOR_STATE, isNew: true }) // Editor
   const [messagesState, setMessagesState] = useDynamicState<MessagesState>({ messages: [] }) // Messages

   return (
      <AutoLayout name="Widget Container" width={"hug-contents"} height={"hug-contents"} overflow="visible">
         {/* Generated Chat (Displayed Result) */}
         <PhoneFrame renderElements={displayMode >= 2} theme={theme}>
            <Interface renderElements={displayMode >= 1} theme={theme}>
               <MessagesLayout renderElements={displayMode >= 0} messagesState={messagesState} theme={theme}>
                  {/* Preview Message */}
                  {editorState.isNew && <MessagePreview editorState={editorState} theme={theme} />}
               </MessagesLayout>
            </Interface>
         </PhoneFrame>

         {/*  */}

         {/* Editor Mode (New Message Constructor) */}
         <MessageBuilder renderElement={isEditMode} editorManager={[editorState, setEditorState, setMessagesState]} theme={theme} />
         {/* TODO: Remove existing messages from display (method) */}
      </AutoLayout>
   )
}

widget.register(Widget)
