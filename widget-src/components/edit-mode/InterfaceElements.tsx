const { widget } = figma
const { AutoLayout, Text, Input, SVG } = widget

interface CreatorCompKitConfig extends Partial<AutoLayoutProps> {
   colorPalette: ThemedColors[ThemeModes]
}

/** Generic `P`: onEvent callback parameters */
interface ContainsEvent<P extends unknown[] = [WidgetClickEvent]> {
   /** TextEditEvent Inputs Value */
   value: P[0] extends WidgetClickEvent ? number : string
   /** example User Click Event */
   onEvent: (...args: P) => void
}

export function Section({ children, ...props }: Partial<CreatorCompKitConfig>) {
   return (
      <AutoLayout name="Section" overflow="visible" direction="vertical" spacing={12} width="fill-parent" {...props}>
         {children}
      </AutoLayout>
   )
}

interface LabelProps extends CreatorCompKitConfig {
   children: string
   isCollapsable?: boolean
}

export function Label({ colorPalette, isCollapsable = false, children, ...props }: LabelProps) {
   const svgPaths = {
      arrowDown: `<svg width='16' height='10' viewBox='0 0 16 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
             <path d='M1.88 0L8 6.18084L14.12 0L16 1.90283L8 10L0 1.90283L1.88 0Z' fill='${colorPalette.text.default}'/>
         </svg>`,
   }

   return (
      <AutoLayout
         name="label"
         opacity={isCollapsable ? 0.5 : 1}
         overflow="visible"
         spacing={8}
         padding={{
            vertical: 0,
            horizontal: 16,
         }}
         width="fill-parent"
         horizontalAlignItems="center"
         verticalAlignItems="center"
         {...props}
      >
         <Text name="title" fill={colorPalette.text.default} width="fill-parent" lineHeight={22} fontSize={17} fontWeight={500}>
            {children}
         </Text>
         <SVG hidden={!isCollapsable} name="Vector" height={10} width={16} src={svgPaths.arrowDown} />
      </AutoLayout>
   )
}

export function ButtonsRow({ children, ...props }: Partial<CreatorCompKitConfig>) {
   return (
      <AutoLayout name="Button Row" overflow="visible" spacing={12} width="fill-parent" verticalAlignItems="center" {...props}>
         {children}
      </AutoLayout>
   )
}

interface ButtonProps<A extends unknown[] = [WidgetClickEvent]> extends CreatorCompKitConfig, PartialPick<ContainsEvent<A>, "value"> {
   children?: string
}

export function ButtomSmall({ colorPalette, children, onEvent, ...props }: ButtonProps) {
   const svgPaths = {
      plus: `<svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
             <path d='M7.05714 6.90714H11.8C11.9381 6.90714 12.05 6.79521 12.05 6.65714V5.34286C12.05 5.20479 11.9381 5.09286 11.8 5.09286H7.05714C6.9743 5.09286 6.90714 5.0257 6.90714 4.94286V0.2C6.90714 0.0619289 6.79521 -0.05 6.65714 -0.05H5.34286C5.20479 -0.05 5.09286 0.0619287 5.09286 0.2V4.94286C5.09286 5.0257 5.0257 5.09286 4.94286 5.09286H0.2C0.0619289 5.09286 -0.05 5.20479 -0.05 5.34286V6.65714C-0.05 6.79521 0.0619287 6.90714 0.2 6.90714H4.94286C5.0257 6.90714 5.09286 6.9743 5.09286 7.05714V11.8C5.09286 11.9381 5.20479 12.05 5.34286 12.05H6.65714C6.79521 12.05 6.90714 11.9381 6.90714 11.8V7.05714C6.90714 6.9743 6.9743 6.90714 7.05714 6.90714Z' fill='white' stroke='${colorPalette.text.white}' stroke-width='0.1'/>
         </svg>`,
   }

   return (
      <AutoLayout
         name="Add"
         onClick={onEvent}
         hoverStyle={{
            fill: colorPalette.surface.actionHover,
         }}
         fill={colorPalette.surface.action}
         stroke={colorPalette.surface.primary30}
         cornerRadius={6}
         overflow="visible"
         spacing={12}
         padding={{
            vertical: 8,
            horizontal: 16,
         }}
         width={(children ?? "").length > 0 ? "fill-parent" : 40}
         height={40}
         horizontalAlignItems="center"
         verticalAlignItems="center"
         {...props}
      >
         <Text hidden={(children ?? "").length == 0} name="Add Button Row" fill={colorPalette.text.white} lineHeight={22} fontSize={14} fontWeight={600}>
            {children}
         </Text>
         <SVG name="plus" height={12} width={12} src={svgPaths.plus} />
      </AutoLayout>
   )
}

/** Branched from telegram chat button */
export function ChatButtonEditable({ colorPalette, onEvent, value, ...props }: Omit<ButtonProps<[TextEditEvent]>, "children">) {
   return (
      <AutoLayout
         name="ChatButton"
         effect={[
            {
               type: "drop-shadow",
               color: "#0000001F",
               offset: {
                  x: 0,
                  y: 4,
               },
               blur: 10.4,
               showShadowBehindNode: false,
            },
            {
               blur: 16.8,
               type: "background-blur",
            },
         ]}
         cornerRadius={6}
         width={"fill-parent"}
         height={40}
         horizontalAlignItems="center"
         verticalAlignItems="center"
         fill={colorPalette.surface.telegramButton}
         {...props}
      >
         <Input
            name="Button 1"
            onTextEditEnd={onEvent}
            value={value ?? ""}
            placeholder="Button Text..."
            horizontalAlignText="center"
            fill={colorPalette.text.white}
            verticalAlignText="center"
            lineHeight={18}
            fontSize={14}
            height={30}
            width={"fill-parent"}
            fontWeight={600}
         />
      </AutoLayout>
   )
}

export function Button({ colorPalette, children, onEvent, ...props }: ButtonProps) {
   const svgPaths = {
      plus: `<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path transform='translate(0.5, 0)' opacity='0.9' d='M11.6667 11.5834H17.6667C18.357 11.5834 18.9167 11.0238 18.9167 10.3334V9.66675C18.9167 8.97639 18.357 8.41675 17.6667 8.41675H11.6667C11.2525 8.41675 10.9167 8.08096 10.9167 7.66675V1.66675C10.9167 0.976392 10.357 0.416748 9.66667 0.416748H9C8.30964 0.416748 7.75 0.976392 7.75 1.66675V7.66675C7.75 8.08096 7.41421 8.41675 7 8.41675H1C0.309644 8.41675 -0.25 8.97639 -0.25 9.66675V10.3334C-0.25 11.0238 0.309644 11.5834 1 11.5834H7C7.41421 11.5834 7.75 11.9192 7.75 12.3334V18.3334C7.75 19.0238 8.30964 19.5834 9 19.5834H9.66667C10.357 19.5834 10.9167 19.0238 10.9167 18.3334V12.3334C10.9167 11.9192 11.2525 11.5834 11.6667 11.5834Z' fill='${colorPalette.text.inverted}' stroke='${colorPalette.text.inverted}' stroke-width='0.5'/>
          </svg>`,
   }

   return (
      <AutoLayout
         name="Button"
         onClick={onEvent}
         hoverStyle={{
            fill: colorPalette.surface.primaryHover,
         }}
         effect={[
            {
               type: "drop-shadow",
               color: colorPalette.surface.inputBg,
               offset: {
                  x: 0,
                  y: 2,
               },
               blur: 3,
            },
            {
               type: "drop-shadow",
               color: "#00000026",
               offset: {
                  x: 0,
                  y: 6,
               },
               blur: 10,
               spread: 4,
            },
         ]}
         fill={colorPalette.surface.primary}
         cornerRadius={8}
         spacing={12}
         padding={{
            top: 16,
            right: 64,
            bottom: 16,
            left: 32,
         }}
         width="fill-parent"
         horizontalAlignItems="center"
         verticalAlignItems="center"
         {...props}
      >
         <Text name="text" fill={colorPalette.text.inverted} lineHeight={22} fontSize={17} fontWeight={600}>
            {children}
         </Text>
         <SVG
            name="plus"
            opacity={0.9}
            x={{
               type: "right",
               offset: 22.333,
            }}
            y={{
               type: "center",
               offset: 0,
            }}
            positioning="absolute"
            height={19}
            width={19}
            src={svgPaths.plus}
         />
      </AutoLayout>
   )
}

interface SelectorProps extends CreatorCompKitConfig, ContainsEvent<[WidgetClickEvent]> {
   options: [string, string]
}

export function Selector({ onEvent, options, value, colorPalette, ...props }: SelectorProps) {
   /** Selector Option */
   interface OptionProps extends ContainsEvent {
      optionIndex: number
      children: string
   }

   const Option = ({ value, onEvent, children, optionIndex }: OptionProps) => {
      return (
         <AutoLayout
            name="Direction"
            onClick={onEvent}
            hoverStyle={{ fill: value == optionIndex ? colorPalette.surface.actionHover : "" }}
            fill={value == optionIndex ? colorPalette.surface.action : ""}
            stroke={value == optionIndex ? colorPalette.surface.primary30 : ""}
            cornerRadius={55}
            overflow="visible"
            spacing={12}
            padding={{
               vertical: 8,
               horizontal: 16,
            }}
            width="fill-parent"
            horizontalAlignItems="center"
            verticalAlignItems="center"
         >
            <Text
               hoverStyle={{ opacity: 1 }}
               opacity={value == optionIndex ? 1 : 0.5}
               name="Out"
               fill={value == optionIndex ? colorPalette.text.white : colorPalette.text.default}
               lineHeight={22}
               fontSize={14}
               fontWeight={600}
            >
               {children}
            </Text>
         </AutoLayout>
      )
   }

   // Main
   return (
      <AutoLayout
         name="Selector"
         fill={colorPalette.surface.inputBg}
         cornerRadius={55}
         overflow="visible"
         spacing="auto"
         padding={4}
         width="fill-parent"
         verticalAlignItems="center"
         {...props}
      >
         <Option value={value} onEvent={onEvent} optionIndex={0}>
            {options[0]}
         </Option>
         <Option value={value} onEvent={onEvent} optionIndex={1}>
            {options[1]}
         </Option>
      </AutoLayout>
   )
}

interface TextInputProps extends CreatorCompKitConfig, ContainsEvent<[TextEditEvent]> {
   placeholder: string
   isResizable?: boolean
}

export function TextInput({ isResizable, colorPalette, onEvent, placeholder, value, ...props }: TextInputProps) {
   return (
      <AutoLayout
         name="TextInput"
         fill={colorPalette.surface.inputBg}
         cornerRadius={8}
         overflow="visible"
         spacing={8}
         padding={{
            vertical: 8,
            horizontal: 16,
         }}
         width="fill-parent"
         height={"hug-contents"}
         minHeight={isResizable ? 64 : 30}
         {...props}
      >
         <Input
            name="Input"
            onTextEditEnd={onEvent}
            value={value}
            placeholder={placeholder}
            fill={colorPalette.text.default}
            width="fill-parent"
            height={"hug-contents"}
            lineHeight={22}
            fontSize={14}
            fontWeight={500}
         />
      </AutoLayout>
   )
}
