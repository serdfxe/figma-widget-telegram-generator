// Dependencies
const { useSyncedState, usePropertyMenu } = figma.widget
// Components
import { THEME_MODES, WIDGET_MENU } from "../constants"

interface useWidgetMenuConfig {
   /** Initial State */
   config: {
      theme: ThemeModes
      displayMode: number
      viewport: number
      isEditMode: boolean
   }
}

/** Default config */
const defaultConfig: useWidgetMenuConfig["config"] = {
   theme: THEME_MODES[0],
   isEditMode: true,
   displayMode: 0,
   viewport: 0,
}

/** Custom Hook Hnadle Widget Property Menu */
export default function useWidgetMenu({ config = defaultConfig }: Partial<useWidgetMenuConfig> = {}) {
   /* State */

   // Display Mode
   const displayOptions = [
      { option: "phone", label: "Framed Phone" },
      { option: "viewport", label: "Viewport (scrollable)" },
      { option: "messages", label: "Chat Messages" },
      { option: "message", label: "Last Message Only" },
   ] as const
   const [displayMode, setDisplayMode] = useSyncedState<number>("displayMode", config.displayMode) // useSyncedState<(typeof displayOptions)[number]["option"]>("displayMode", displayOptions[0].option)

   // Theme Mode
   const [theme, setTheme] = useSyncedState<ThemeModes>("theme", config.theme)
   const themeOptions = THEME_MODES.map((mode) => {
      return { option: mode, label: mode.charAt(0).toUpperCase() + mode.slice(1) }
   })

   // Viewport Dimensions
   const viewportDimensions = [
      { option: "lg", label: `${WIDGET_MENU.dimensions[0].width}x${WIDGET_MENU.dimensions[0].height} (Default)` },
      { option: "md", label: `${WIDGET_MENU.dimensions[1].width}x${WIDGET_MENU.dimensions[1].height} (Iphone 12/13 Pro)` },
      { option: "sm", label: `${WIDGET_MENU.dimensions[2].width}x${WIDGET_MENU.dimensions[2].height} (Iphone SE)` },
   ] as const
   const [viewport, setViewport] = useSyncedState<number>("viewport", config.viewport)

   // Editor Mode (New message constructor/form)
   const [isEditMode, setIsEditMode] = useSyncedState("isEditMode", config.isEditMode)

   /* Icons */

   const svgPaths = {
      edit: `<svg width='14' height='14' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path fill-rule='evenodd' clip-rule='evenodd' d='M61.48 1.15999L70.84 10.52C72.4 12.08 72.4 14.6 70.84 16.16L63.52 23.48L48.52 8.47999L55.84 1.15999C57.4 -0.40001 59.92 -0.40001 61.48 1.15999ZM0 72V57L44.24 12.76L59.24 27.76L15 72H0Z' fill='#BBBBBB'/>
         </svg>`,
      hide: `<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_139_4775)"><mask id="mask0_139_4775" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="13">
            <path d="M16 0.5H0V12.5H16V0.5Z" fill="white"/></mask><g mask="url(#mask0_139_4775)">
            <path d="M1.9998 0.5L13.9998 12.5M11.3748 10.0669C10.3603 10.6134 9.21375 10.9999 7.9998 10.9999C5.35181 10.9999 3.02456 9.16085 1.68998 7.83411C1.3377 7.48389 1.16159 7.3088 1.04948 6.96509C0.969522 6.71996 0.969497 6.27993 1.04948 6.03481C1.16163 5.6911 1.3381 5.51559 1.69108 5.16475C2.36374 4.49616 3.28839 3.69769 4.37902 3.07007M13.6248 8.47513C13.8745 8.25538 14.1034 8.03922 14.3086 7.8352L14.3108 7.83292C14.6623 7.48357 14.8385 7.30841 14.9504 6.96546C15.0304 6.72034 15.0302 6.28013 14.9503 6.035C14.8382 5.6914 14.6619 5.51581 14.3098 5.16583C12.9752 3.83906 10.6477 2 7.9998 2C7.74667 2 7.49648 2.01681 7.2498 2.04836M8.99198 7.625C8.72753 7.85838 8.3802 8 7.9998 8C7.17137 8 6.4998 7.32843 6.4998 6.5C6.4998 6.09538 6.66001 5.72831 6.92046 5.4585" stroke="#BBBBBB" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </g></g><defs><clipPath id="clip0_139_4775"><rect width="16" height="13" fill="white"/></clipPath></defs>
         </svg>`,
      // Unused
      preview: `<svg width='14' height='14' viewBox='0 0 79 79' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M8.7778 79C6.3639 79 4.2967 78.1412 2.5763 76.4237C0.85876 74.7033 0 72.6361 0 70.2222V8.7778C0 6.3639 0.85876 4.2967 2.5763 2.5763C4.2967 0.8588 6.3639 0 8.7778 0H70.2222C72.6361 0 74.7033 0.8588 76.4237 2.5763C78.1412 4.2967 79 6.3639 79 8.7778V70.2222C79 72.6361 78.1412 74.7033 76.4237 76.4237C74.7033 78.1412 72.6361 79 70.2222 79H8.7778ZM8.7778 65.2222C8.7778 67.9836 11.0164 70.2222 13.7778 70.2222H65.2222C67.9836 70.2222 70.2222 67.9836 70.2222 65.2222V22.5556C70.2222 19.7941 67.9836 17.5556 65.2222 17.5556H13.7778C11.0164 17.5556 8.7778 19.7941 8.7778 22.5556V65.2222ZM39.5 61.4444C33.5019 61.4444 28.1445 59.8162 23.4279 56.5596C19.2858 53.704 16.1443 50.1013 14.0036 45.7515C13.4255 44.577 13.4255 43.2008 14.0036 42.0263C16.1443 37.6765 19.2858 34.0737 23.4279 31.2182C28.1445 27.9616 33.5019 26.3333 39.5 26.3333C45.4981 26.3333 50.857 27.9616 55.5765 31.2182C59.7161 34.0737 62.8561 37.6765 64.9965 42.0263C65.5744 43.2008 65.5744 44.577 64.9965 45.7515C62.8561 50.1013 59.7161 53.704 55.5765 56.5596C50.857 59.8162 45.4981 61.4444 39.5 61.4444ZM39.5 54.8611C43.5963 54.8611 47.3269 53.8912 50.6917 51.9513C53.2541 50.4762 55.3924 48.5658 57.1064 46.2202C58.1218 44.8306 58.1218 42.9472 57.1065 41.5575C55.3925 39.2112 53.2542 37.2995 50.6917 35.8221C47.3269 33.8851 43.5963 32.9167 39.5 32.9167C35.4037 32.9167 31.6731 33.8851 28.3083 35.8221C25.7458 37.2995 23.6075 39.2112 21.8935 41.5575C20.8782 42.9472 20.8782 44.8306 21.8936 46.2202C23.6076 48.5658 25.7459 50.4762 28.3083 51.9513C31.6731 53.8912 35.4037 54.8611 39.5 54.8611ZM39.5 50.4722C37.6713 50.4722 36.1176 49.8314 34.839 48.5499C33.5574 47.2713 32.9167 45.7176 32.9167 43.8889C32.9167 42.0602 33.5574 40.5065 34.839 39.2279C36.1176 37.9463 37.6713 37.3056 39.5 37.3056C41.3287 37.3056 42.8824 37.9463 44.161 39.2279C45.4426 40.5065 46.0833 42.0602 46.0833 43.8889C46.0833 45.7176 45.4426 47.2713 44.161 48.5499C42.8824 49.8314 41.3287 50.4722 39.5 50.4722Z' fill='#BBBBBB'/>
         </svg>`,
      show: `<svg width='16' height='9' viewBox='0 0 20 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M1.5868 7.77881C3.36623 9.54783 6.46953 11.9999 10.0002 11.9999C13.5308 11.9999 16.6335 9.54783 18.413 7.77881C18.8823 7.31226 19.1177 7.07819 19.2671 6.62012C19.3738 6.29328 19.3738 5.70674 19.2671 5.3799C19.1177 4.92181 18.8823 4.6877 18.413 4.22111C16.6335 2.45208 13.5308 0 10.0002 0C6.46953 0 3.36623 2.45208 1.5868 4.22111C1.11714 4.68802 0.882286 4.92165 0.732796 5.3799C0.626177 5.70673 0.626177 6.29328 0.732796 6.62012C0.882286 7.07837 1.11714 7.31189 1.5868 7.77881Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
            <path d='M8 6C8 7.10457 8.89543 8 10 8C11.1046 8 12 7.10457 12 6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
         </svg>`,
   }

   /* Widget Menu */

   const optionalMenuItem = <T extends PropertyMenuItem>(propObj: T, conditional: boolean): [T] | [] => {
      return conditional ? [propObj] : []
   }

   usePropertyMenu(
      [
         // Display Mode Dropdown (Scrollable Viewport / Full Phone / Only Messages)
         {
            itemType: "dropdown",
            propertyName: "display",
            tooltip: "Chat Display Mode",
            selectedOption: displayOptions[displayMode].option,
            options: [...displayOptions],
         },

         // Viewport Dimensions (Presets)
         ...optionalMenuItem(
            {
               itemType: "dropdown",
               propertyName: "viewport",
               tooltip: "Viewport Dimensions Preset",
               selectedOption: viewportDimensions[viewport].option,
               options: [...viewportDimensions],
            },
            displayMode === 1,
         ),

         { itemType: "separator" }, // Display Settings / Widget Settings

         // Theme Mode Dropdown
         {
            itemType: "dropdown",
            propertyName: "theme",
            tooltip: "Theme Mode selector",
            selectedOption: theme,
            options: themeOptions,
         },

         // Editor Mode Toggle
         {
            itemType: "action",
            propertyName: "input",
            tooltip: isEditMode ? "Display Mode (Hide Builder)" : "Edit Mode (New Messages)",
            icon: isEditMode ? svgPaths.hide : svgPaths.edit,
         },
      ],
      ({ propertyName, propertyValue }) => {
         switch (propertyName) {
            case "theme":
               setTheme(propertyValue as ThemeModes)
               break
            case "input":
               setIsEditMode(!isEditMode)
               break
            case "display":
               setDisplayMode(displayOptions.findIndex((option) => option.option === propertyValue))
               break
            case "viewport": {
               setViewport(viewportDimensions.findIndex((option) => option.option === propertyValue))
               break
            }
         }
      },
   )

   return { displayMode, viewport, theme, isEditMode }
}
