// Dependencies
const { widget } = figma
const { useSyncedState, AutoLayout, Text } = widget
// Components
import { remapTokens } from "../../utils"
import { Section, Label, ButtonsRow, Button, ButtomSmall, ChatButtonEditable, Selector, TextInput } from "./InterfaceElements"

/** Import Changelog
 * Generate Interface, colors & extracted svg paths
 * Separated reusable components ()
 */

interface MessageCreatorProps extends Partial<AutoLayoutProps>, ReqCompProps {
   /** Fully Hide from layers tree */
   renderElement: boolean
}

export function MessageCreator({ renderElement, theme, ...props }: MessageCreatorProps) {
   // Single state object to hold multiple input values
   const [inputs, setInputs] = useSyncedState("inputs", {
      messageDirection: 0,
      messageType: 1,
      messageText: "",
      buttons: [
         { id: 1, text: "Button 1" },
         { id: 2, text: "Button 2" },
      ],
   })

   // Single handler function to update the state based on input name and value
   const handleInputChange = (name: string, value: string | number) => {
      setInputs((prevInputs) => ({
         ...prevInputs,
         [name]: value,
      }))
   }

   // Handler for direction change
   const handleDirectionChange = () => handleInputChange("messageDirection", (inputs.messageDirection + 1) % 2)

   // Handler for Type change
   const handleTypeChange = () => handleInputChange("messageType", (inputs.messageType + 1) % 2)

   // Handler function to update the text of a specific button
   const handleButtonTextChange = (id: number, newText: string) => {
      setInputs((prevInputs) => ({
         ...prevInputs,
         buttons: prevInputs.buttons.map((button) => (button.id === id ? { ...button, text: newText } : button)),
      }))
   }

   // // Single handler function to update the state based on input name and value
   // const handleInputChange = (name: keyof typeof state, value: string | number) => {
   //    setSafeState(name, value)
   // }

   // // Handler function to update the text of a specific button
   // const handleButtonTextChange = (id: number, newText: string) => {
   //    setSafeState(
   //       "buttons",
   //       state.buttons.map((button) => (button.id === id ? { ...button, text: newText } : button)),
   //    )
   // }

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
               <Selector onEvent={handleDirectionChange} value={inputs.messageDirection} options={["Out", "In"]} colorPalette={color} />
            </Section>
            <Section>
               <Label colorPalette={color}>Message Type</Label>
               <Selector onEvent={handleTypeChange} value={inputs.messageType} options={["Image / File", "Text"]} colorPalette={color} />
            </Section>
            {/* Message Type Image / File */}
            <Section hidden={inputs.messageType === 1}>
               <Label colorPalette={color}>Image Details</Label>
               <TextInput onEvent={console.log} value={""} placeholder="Image/ File Name" colorPalette={color} />
               <TextInput onEvent={console.log} value={""} placeholder="Image/ File Extension" colorPalette={color} />
               <TextInput onEvent={console.log} value={""} placeholder="Image/ File Size" colorPalette={color} />
            </Section>
            {/* Message Type Text */}
            <Section hidden={inputs.messageType !== 1}>
               <Label colorPalette={color}>Message Content</Label>
               <TextInput onEvent={console.log} value={""} placeholder="Text Message..." isResizable={true} colorPalette={color} />
               <AutoLayout name="Buttons Container" cornerRadius={8} overflow="visible" direction="vertical" spacing={12} width="fill-parent">
                  <ButtonsRow>
                     <ChatButtonEditable value={"Button 1"} onEvent={console.log} name="chat-button" width="fill-parent" colorPalette={color} />
                     <ButtomSmall onEvent={console.log} colorPalette={color} />
                  </ButtonsRow>
                  <ButtonsRow>
                     <ButtomSmall onEvent={console.log} colorPalette={color}>
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
            {/* Main Event */}
            <Button onEvent={console.log} colorPalette={color}>
               Apply To Chat
            </Button>
         </AutoLayout>
      )
   )
}
