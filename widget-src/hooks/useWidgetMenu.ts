// Dependencies
const { useSyncedState, usePropertyMenu } = figma.widget
// Components
import { THEME_MODES } from "../constants"

interface useWidgetMenuConfig {
   /** Initial State */
   config: {
      theme: ThemeModes
      displayMode: number
      isEditMode: boolean
   }
}

/** Default config */
const defaultConfig: useWidgetMenuConfig["config"] = {
   theme: THEME_MODES[0],
   isEditMode: true,
   displayMode: 2,
}

/** Custom Hook Hnadle Widget Property Menu */
export default function useWidgetMenu({ config = defaultConfig }: Partial<useWidgetMenuConfig> = {}) {
   // Theme Mode
   const [theme, setTheme] = useSyncedState<ThemeModes>("theme", config.theme)
   const themeOptions = THEME_MODES.map((mode) => {
      return { option: mode, label: mode.charAt(0).toUpperCase() + mode.slice(1) }
   })

   // Display Mode
   const displayOptions = [
      { option: "messages", label: "Only Messages" },
      { option: "viewport", label: "Viewport (scrollable)" },
      { option: "phone", label: "Framed Phone" },
   ] as const
   const [displayMode, setDisplayMode] = useSyncedState<number>("displayMode", config.displayMode) // useSyncedState<(typeof displayOptions)[number]["option"]>("displayMode", displayOptions[0].option)

   // Input (New Message)
   const [isEditMode, setIsEditMode] = useSyncedState("isEditMode", config.isEditMode)

   const svgPaths = {
      preview: `<svg width='14' height='14' viewBox='0 0 79 79' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M8.7778 79C6.3639 79 4.2967 78.1412 2.5763 76.4237C0.85876 74.7033 0 72.6361 0 70.2222V8.7778C0 6.3639 0.85876 4.2967 2.5763 2.5763C4.2967 0.8588 6.3639 0 8.7778 0H70.2222C72.6361 0 74.7033 0.8588 76.4237 2.5763C78.1412 4.2967 79 6.3639 79 8.7778V70.2222C79 72.6361 78.1412 74.7033 76.4237 76.4237C74.7033 78.1412 72.6361 79 70.2222 79H8.7778ZM8.7778 65.2222C8.7778 67.9836 11.0164 70.2222 13.7778 70.2222H65.2222C67.9836 70.2222 70.2222 67.9836 70.2222 65.2222V22.5556C70.2222 19.7941 67.9836 17.5556 65.2222 17.5556H13.7778C11.0164 17.5556 8.7778 19.7941 8.7778 22.5556V65.2222ZM39.5 61.4444C33.5019 61.4444 28.1445 59.8162 23.4279 56.5596C19.2858 53.704 16.1443 50.1013 14.0036 45.7515C13.4255 44.577 13.4255 43.2008 14.0036 42.0263C16.1443 37.6765 19.2858 34.0737 23.4279 31.2182C28.1445 27.9616 33.5019 26.3333 39.5 26.3333C45.4981 26.3333 50.857 27.9616 55.5765 31.2182C59.7161 34.0737 62.8561 37.6765 64.9965 42.0263C65.5744 43.2008 65.5744 44.577 64.9965 45.7515C62.8561 50.1013 59.7161 53.704 55.5765 56.5596C50.857 59.8162 45.4981 61.4444 39.5 61.4444ZM39.5 54.8611C43.5963 54.8611 47.3269 53.8912 50.6917 51.9513C53.2541 50.4762 55.3924 48.5658 57.1064 46.2202C58.1218 44.8306 58.1218 42.9472 57.1065 41.5575C55.3925 39.2112 53.2542 37.2995 50.6917 35.8221C47.3269 33.8851 43.5963 32.9167 39.5 32.9167C35.4037 32.9167 31.6731 33.8851 28.3083 35.8221C25.7458 37.2995 23.6075 39.2112 21.8935 41.5575C20.8782 42.9472 20.8782 44.8306 21.8936 46.2202C23.6076 48.5658 25.7459 50.4762 28.3083 51.9513C31.6731 53.8912 35.4037 54.8611 39.5 54.8611ZM39.5 50.4722C37.6713 50.4722 36.1176 49.8314 34.839 48.5499C33.5574 47.2713 32.9167 45.7176 32.9167 43.8889C32.9167 42.0602 33.5574 40.5065 34.839 39.2279C36.1176 37.9463 37.6713 37.3056 39.5 37.3056C41.3287 37.3056 42.8824 37.9463 44.161 39.2279C45.4426 40.5065 46.0833 42.0602 46.0833 43.8889C46.0833 45.7176 45.4426 47.2713 44.161 48.5499C42.8824 49.8314 41.3287 50.4722 39.5 50.4722Z' fill='#BBBBBB'/>
         </svg>`,
      edit: `<svg width='14' height='14' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path fill-rule='evenodd' clip-rule='evenodd' d='M61.48 1.15999L70.84 10.52C72.4 12.08 72.4 14.6 70.84 16.16L63.52 23.48L48.52 8.47999L55.84 1.15999C57.4 -0.40001 59.92 -0.40001 61.48 1.15999ZM0 72V57L44.24 12.76L59.24 27.76L15 72H0Z' fill='#BBBBBB'/>
         </svg>`,
      hide: `<svg width='16' height='12' viewBox='0 0 20 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M1.99989 0L17.9999 16M14.4999 12.7559C13.1473 13.4845 11.6185 13.9999 9.99989 13.9999C6.46924 13.9999 3.36624 11.5478 1.5868 9.77881C1.1171 9.31185 0.882287 9.0784 0.732801 8.62012C0.626192 8.29328 0.626159 7.70657 0.732801 7.37974C0.882333 6.92147 1.11763 6.68745 1.58827 6.21967C2.48515 5.32821 3.71801 4.26359 5.17219 3.42676M17.4999 10.6335C17.8329 10.3405 18.138 10.0523 18.4117 9.78027L18.4146 9.77723C18.8832 9.31142 19.1182 9.07788 19.2674 8.62061C19.374 8.29378 19.3738 7.70684 19.2672 7.38C19.1178 6.92187 18.8827 6.68775 18.4133 6.22111C16.6338 4.45208 13.5305 2 9.99989 2C9.66239 2 9.3288 2.02241 8.99989 2.06448M11.3228 9.5C10.9702 9.81118 10.5071 10 9.99989 10C8.89532 10 7.99989 9.10457 7.99989 8C7.99989 7.4605 8.21351 6.97108 8.56077 6.61133' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
         </svg>`,
      show: `<svg width='16' height='9' viewBox='0 0 20 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M1.5868 7.77881C3.36623 9.54783 6.46953 11.9999 10.0002 11.9999C13.5308 11.9999 16.6335 9.54783 18.413 7.77881C18.8823 7.31226 19.1177 7.07819 19.2671 6.62012C19.3738 6.29328 19.3738 5.70674 19.2671 5.3799C19.1177 4.92181 18.8823 4.6877 18.413 4.22111C16.6335 2.45208 13.5308 0 10.0002 0C6.46953 0 3.36623 2.45208 1.5868 4.22111C1.11714 4.68802 0.882286 4.92165 0.732796 5.3799C0.626177 5.70673 0.626177 6.29328 0.732796 6.62012C0.882286 7.07837 1.11714 7.31189 1.5868 7.77881Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
            <path d='M8 6C8 7.10457 8.89543 8 10 8C11.1046 8 12 7.10457 12 6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
         </svg>`,
   }

   usePropertyMenu(
      [
         // Theme Mode Dropdown
         {
            itemType: "dropdown",
            propertyName: "theme",
            tooltip: "Theme Mode selector",
            selectedOption: theme,
            options: themeOptions,
         },
         // Display Mode Dropdown (Scrollable Viewport / Full Phone / Only Messages)
         {
            itemType: "dropdown",
            propertyName: "display",
            tooltip: "Chat Display Mode",
            selectedOption: displayOptions[displayMode].option,
            options: [...displayOptions],
         },
         // Input Toggle (Edit Mode / Display Mode)
         {
            itemType: "action",
            propertyName: "input",
            tooltip: isEditMode ? "Preview Mode (Hide Inputs)" : "Edit Mode (New Messages)",
            icon: isEditMode ? svgPaths.preview : svgPaths.edit,
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
         }
      },
   )

   return { theme, displayMode, isEditMode }
}
