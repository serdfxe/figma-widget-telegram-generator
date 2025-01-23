// Dependencies
const { AutoLayout } = figma.widget

interface ChatLayoutProps extends Partial<AutoLayoutProps>, ReqCompProps, OptionalRender {}

/** Layout In & Out Messages */
export function ChatLayout({ renderElements, children, ...props }: ChatLayoutProps) {
   return !renderElements ? (
      children
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
         {children}
      </AutoLayout>
   )
}
