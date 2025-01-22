/* 
   This is a Telegram bot chat generator. 
*/
// Dependencies
const { widget } = figma
const { AutoLayout } = widget
// Components
import { PhoneFrame } from "./components/display/PhoneFrame"
import { Interface } from "./components/display/Interface"
import { MessagesSample } from "./components/MessagesSample"
import { useWidgetMenu } from "./hooks/useWidgetMenu"
import { ChatLayout } from "./components/display/ChatLayout"
import { MessageCreator } from "./components/edit-mode/MessageCreator"

function Widget() {
   // Widget Property Menu
   const { theme, displayMode, isEditMode } = useWidgetMenu()

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
         <MessageCreator renderElement={isEditMode} theme={theme} />
      </AutoLayout>
   )
}

widget.register(Widget)
