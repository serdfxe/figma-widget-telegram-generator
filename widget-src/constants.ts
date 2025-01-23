export const THEME_MODES = ["light", "dark"] as const
/** Editor Manager State
 * direction - 0: out, 1: in
 * type - 0: image, 1: text
 */
export const EDITOR_STATE = { direction: 0, type: 1, text: "", name: "", size: "", extension: "", buttons: [[{ id: 1, text: "", hasRef: false }]] }
