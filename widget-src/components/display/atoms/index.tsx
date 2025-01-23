// Dependencies
const { AutoLayout } = figma.widget
// Components
import { Button } from "@/components/ui"
import { EDITOR_STATE } from "@/constants"

interface SideContainerProps extends Partial<AutoLayoutProps> {
   side: "out" | "in"
}

export function DirectionContainer({ children, side, ...props }: SideContainerProps) {
   switch (side) {
      case "out":
         return (
            <AutoLayout name="Out" overflow="visible" direction="vertical" spacing={8} width="fill-parent" verticalAlignItems="center" horizontalAlignItems="end" {...props}>
               {children}
            </AutoLayout>
         )
      case "in":
         return (
            <AutoLayout name="In" overflow="visible" direction="vertical" spacing={8} width="fill-parent" {...props}>
               {children}
            </AutoLayout>
         )
   }
}

interface WithButtonsProps extends Partial<AutoLayoutProps>, ReqCompProps {
   buttons: (typeof EDITOR_STATE)["buttons"]
}

export function WithButtons({ children, buttons, theme, ...props }: WithButtonsProps) {
   return (
      <AutoLayout name="With Buttons" overflow="visible" direction="vertical" spacing={8} horizontalAlignItems="end" {...props}>
         {/* Message */}
         {children}
         {/* 1 Buttons Container */}
         <AutoLayout name="Actions" overflow="visible" direction="vertical" spacing={4} width="fill-parent">
            {/* 2 Buttons Row */}
            {buttons.map((buttonsRow) => (
               <AutoLayout name="Row" overflow="visible" spacing={4} width="fill-parent" horizontalAlignItems="center" verticalAlignItems="center">
                  {buttonsRow.map((button) => (
                     <Button config={{ hasRef: false }} theme={theme} name="chat-button" width="fill-parent">
                        {button.text}
                     </Button>
                  ))}
               </AutoLayout>
            ))}
         </AutoLayout>
      </AutoLayout>
   )
}
