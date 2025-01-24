export const THEME_MODES = ["light", "dark"] as const
/** Editor Manager State
 * direction - 0: out, 1: in
 * type - 0: image, 1: text
 */
export const EDITOR_STATE = { direction: 0, type: 1, text: "Sample Text", name: "File_Name", size: "1.4", extension: ".PNG", buttons: [] }

export const EDITOR_INPUTS = {
   direction: { values: ["In", "Out"] },
   type: { values: ["File", "Text", "Image"] },
} as const
