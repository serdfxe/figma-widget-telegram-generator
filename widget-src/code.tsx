/* This is a Telegram bot chat generator. */
// Dependencies
const { widget } = figma
const { AutoLayout } = widget
// Components
import { useWidgetMenu, useDynamicState } from "@/hooks"
import { PhoneFrame, Interface, ChatLayout } from "@/components/display"
import { MessageCreator } from "@/components/edit-mode"
import { EDITOR_STATE } from "./constants"

import { MessagesSample } from "./components/MessagesSample"

function Widget() {
   // Widget Property Menu
   const { theme, displayMode, isEditMode } = useWidgetMenu()
   // New Message Editor State Manager
   const [editorState, setEditorState] = useDynamicState(EDITOR_STATE)

   return (
      <AutoLayout name="Widget Container" width={"hug-contents"} height={"hug-contents"} overflow="visible">
         {/* Generated Chat (Result) */}
         <PhoneFrame renderElements={displayMode >= 2} theme={theme}>
            <Interface renderElements={displayMode >= 1} theme={theme}>
               <ChatLayout renderElements={displayMode >= 0} theme={theme}>
                  <MessagesSample theme={theme} />
               </ChatLayout>
            </Interface>
         </PhoneFrame>

         {/* Edit Interface (New Message) */}
         <MessageCreator renderElement={isEditMode} editorManager={[editorState, setEditorState]} theme={theme} />
      </AutoLayout>
   )
}

widget.register(Widget)
