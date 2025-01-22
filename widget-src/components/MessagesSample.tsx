const { widget } = figma
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { useSyncedState, usePropertyMenu, Frame, Image, AutoLayout, Text, Input, SVG } = widget

import { Button } from "./ui/Button"
import { Message } from "./ui/Message"

export function MessagesSample({ theme }: Partial<AutoLayoutProps> & ReqCompProps) {
   return (
      <>
         <AutoLayout name="In" overflow="visible" direction="vertical" spacing={8} width="fill-parent">
            {/* <MessageInTypeImage name="MessageIn" /> */}
            <Text>DASDAS</Text>
         </AutoLayout>
         <AutoLayout name="Out" overflow="visible" direction="vertical" spacing={8} width="fill-parent" verticalAlignItems="center" horizontalAlignItems="end">
            {/* <Message message="Hey Maximum! How" side="out" theme={theme} type="text" /> */}
            {/* <Message message="Hey Maximum! How is it, Hey Maximum! How is it, Hey Maximum! How is it ,Hey Maximum! How is it" side="out" theme={theme} type="text" /> */}
            {/* <MessageOutTypeImage name="MessageOut" /> */}
            {/* <MessageOutTypeText name="MessageOut" width="fill-parent" /> */}
         </AutoLayout>
         <AutoLayout name="In" overflow="visible" direction="vertical" spacing={8} width="fill-parent" verticalAlignItems="end">
            <Message config={{ text: "Weather Forecast" }} type="text" side="in" theme={theme} />
            <Message config={{ fileName: "IMG_023", fileSize: "22", fileExtension: ".pngh" }} type="image" side="in" theme={theme} />
         </AutoLayout>
         <AutoLayout name="Out" overflow="visible" direction="vertical" spacing={8} width="fill-parent" horizontalAlignItems="end">
            <AutoLayout name="With Buttons" overflow="visible" direction="vertical" spacing={8} horizontalAlignItems="end">
               <Message config={{ text: "Message Out Type Text" }} type="text" side="out" theme={theme} />
               {/* 1 Buttons Container */}
               <AutoLayout name="Actions" overflow="visible" direction="vertical" spacing={4} width="fill-parent">
                  {/* 2 Buttons Row */}
                  <AutoLayout name="Row" overflow="visible" spacing={4} width="fill-parent" horizontalAlignItems="center" verticalAlignItems="center">
                     <Button config={{ hasRef: false }} theme={theme} name="chat-button" width="fill-parent">
                        Button 3
                     </Button>
                     <Button config={{ hasRef: false }} theme={theme} name="chat-button" width="fill-parent">
                        Button 1
                     </Button>
                  </AutoLayout>
                  {/* 2 Buttons Row */}
                  <AutoLayout name="Row" overflow="visible" spacing={4} width="fill-parent" horizontalAlignItems="center" verticalAlignItems="center">
                     <Button config={{ hasRef: true }} theme={theme} name="chat-button" width="fill-parent">
                        Visit Website
                     </Button>
                  </AutoLayout>
               </AutoLayout>
            </AutoLayout>
         </AutoLayout>
         <AutoLayout name="In" overflow="visible" direction="vertical" spacing={8} width="fill-parent">
            {/* <MessageInTypeImage name="MessageIn" /> */}
         </AutoLayout>
         <AutoLayout name="Out" overflow="visible" direction="vertical" spacing={8} width="fill-parent" verticalAlignItems="center" horizontalAlignItems="end">
            {/* <MessageOutTypeImage name="MessageOut" /> */}
            {/* <MessageOutTypeText name="MessageOut" width="fill-parent" /> */}
            {/* <Message message="Hey Maximum! How" side="out" theme={theme} type="text" /> */}
            {/* <Message message="Weather Forecast" side="out" theme={theme} type="image" /> */}
         </AutoLayout>
      </>
   )
}
