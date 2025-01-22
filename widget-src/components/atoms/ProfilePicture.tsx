const { widget } = figma
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { useSyncedState, usePropertyMenu, Frame, Image, AutoLayout, Text, Rectangle, Input, SVG } = widget

import { ProfilePic64 } from "../../assets/base64/ProfilePic"

/** Import Changelog
 * SVG to base64 Image with props src
 */

interface ProfilePicProps extends Partial<FrameProps> {
   profilePicture?: "random-08"
}

export function ProfilePic({ profilePicture = "random-08", ...props }: ProfilePicProps) {
   return (
      <Frame name="ProfilePic" overflow="visible" width={37} height={37} {...props}>
         <Image name="Preview" cornerRadius={50} strokeWidth={0} strokeAlign="center" width={37} height={37} src={ProfilePic64[profilePicture]} />
      </Frame>
   )
}
