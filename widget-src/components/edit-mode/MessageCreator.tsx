// Dependencies
const { AutoLayout, Text } = figma.widget
// Components
import { remapTokens } from "@/utils"
import { type SetCallback } from "@/hooks"
import { EDITOR_STATE } from "@/constants"
// Internal
import { Section, Label, ButtonsRow, Button, ButtomSmall, ChatButtonEditable, Selector, TextInput } from "./InterfaceElements"

/** Import Changelog
 * Generate Interface, colors & extracted svg paths
 * Separated reusable components ()
 */

interface MessageCreatorProps extends Partial<AutoLayoutProps>, ReqCompProps {
   /** Fully Hide from layers tree */
   renderElement: boolean
   /** Editor State Manager (New Message Inputs Centralized State at base code.tsx) */
   editorManager: [typeof EDITOR_STATE, SetCallback<typeof EDITOR_STATE>]
}

export function MessageCreator({ editorManager, renderElement, theme, ...props }: MessageCreatorProps) {
   const [{ direction, type, text, name, extension, size, buttons }, setEditorState] = editorManager

   /** Overrides values of a specific button */
   const updateButton = (row: number, id: number, newvals: Partial<(typeof EDITOR_STATE)["buttons"][number][number]>) => {
      setEditorState(
         "buttons",
         buttons.map((buttonRow, rowIndex) => (rowIndex === row ? buttonRow.map((button, buttonIndex) => (buttonIndex === id ? { ...button, ...newvals } : button)) : buttonRow)),
      )
   }

   const addButtonToRow = () => {}
   const addRowOfButtons = () => {}

   // Theme Mode
   /** Edit Module Color Palette */
   const color = remapTokens({
      surface: {
         // Toned
         primaryHover: { dark: "#EAFFC8", light: "#567FE7" },
         primary: { dark: "#D3FF8D", light: "#2851B7" },
         primary30: { dark: "#D3FF8D4D", light: "#2851B74D" },
         //  Action
         telegramButton: { dark: "#FFF3", light: "#24242487" },
         action: { dark: "#313131", light: "#313131" },
         actionHover: { dark: "#444444", light: "#444444" },
         inputBg: { dark: "#0000004D", light: "#00000015" },
         // Module
         bg: { dark: "#252525", light: "#FFFFFF" },
      },
      text: {
         default: { dark: "#FFFFFF", light: "#000" },
         inverted: { dark: "#000", light: "#FFF" },
         black: { dark: "#000", light: "#000" },
         white: { dark: "#FFF", light: "#FFF" },
      },
   })[theme]

   return (
      renderElement && (
         <AutoLayout
            name="MessageCreator"
            positioning="absolute"
            x={{
               type: "right",
               offset: -25 - 390,
            }}
            y={16}
            effect={[
               {
                  type: "drop-shadow",
                  color: "#00000059",
                  offset: {
                     x: 0,
                     y: 3,
                  },
                  blur: 26,
                  showShadowBehindNode: false,
               },
               {
                  type: "drop-shadow",
                  color: "#00000040",
                  offset: {
                     x: 0,
                     y: 4,
                  },
                  blur: 108.5,
                  showShadowBehindNode: false,
               },
            ]}
            fill={color.surface.bg}
            cornerRadius={16}
            direction="vertical"
            spacing={24}
            padding={{
               vertical: 32,
               horizontal: 16,
            }}
            width={390}
            horizontalAlignItems="center"
            stroke={color.surface.primary30}
            strokeAlign="outside"
            strokeDashPattern={[16, 8]}
            {...props}
         >
            <Section horizontalAlignItems={"center"}>
               <Text name="title" fill={color.text.default} verticalAlignText="center" lineHeight={22} fontSize={22} fontWeight={600} height={46}>
                  Add New Message
               </Text>
            </Section>
            <Section>
               <Label colorPalette={color}>Message Direction</Label>
               <Selector onEvent={(e, i) => setEditorState("direction", i++)} value={direction} options={["Out", "In"]} colorPalette={color} />
            </Section>
            <Section>
               <Label colorPalette={color}>Message Type</Label>
               <Selector onEvent={(e, i) => setEditorState("type", i++)} value={type} options={["Image / File", "Text"]} colorPalette={color} />
            </Section>
            {/* Message Type Image / File */}
            <Section hidden={type === 1}>
               <Label colorPalette={color}>Image Details</Label>
               <TextInput onEvent={(e) => setEditorState("name", e.characters)} value={name} placeholder="Image/ File Name" colorPalette={color} />
               <TextInput onEvent={(e) => setEditorState("extension", e.characters)} value={extension} placeholder="Image/ File Extension" colorPalette={color} />
               <TextInput onEvent={(e) => setEditorState("size", e.characters)} value={size} placeholder="Image/ File Size" colorPalette={color} />
            </Section>
            {/* Message Type Text */}
            <Section hidden={type !== 1}>
               <Label colorPalette={color}>Message Content</Label>
               <TextInput onEvent={(e) => setEditorState("text", e.characters)} value={text} placeholder="Text Message..." isResizable={true} colorPalette={color} />
               <AutoLayout name="Buttons Container" cornerRadius={8} overflow="visible" direction="vertical" spacing={12} width="fill-parent">
                  <ButtonsRow>
                     <ChatButtonEditable
                        value={buttons[0][0].text}
                        onEvent={(e) => updateButton(0, 0, { text: e.characters })}
                        name="chat-button"
                        width="fill-parent"
                        colorPalette={color}
                     />
                     <ChatButtonEditable
                        value={buttons[0][0].text}
                        onEvent={(e) => updateButton(0, 0, { text: e.characters })}
                        name="chat-button"
                        width="fill-parent"
                        colorPalette={color}
                     />
                     <ButtomSmall onEvent={() => addButtonToRow()} colorPalette={color} />
                  </ButtonsRow>
                  <ButtonsRow>
                     <ButtomSmall onEvent={() => addRowOfButtons()} colorPalette={color}>
                        Add Buttons Row
                     </ButtomSmall>
                  </ButtonsRow>
               </AutoLayout>
            </Section>
            <Section>
               <Label isCollapsable={true} colorPalette={color}>
                  Advanced
               </Label>
            </Section>
            {/* Editor Main Event */}
            <Button onEvent={console.log} colorPalette={color}>
               Apply To Chat
            </Button>
         </AutoLayout>
      )
   )
}
